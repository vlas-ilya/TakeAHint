import GameEvent from '../beans/game/GameEvent';
import GameFactory from './GameFactory';
import { Injectable } from '@nestjs/common';
import Player from '../beans/player/Player';
import SocketService from './SocketService';

@Injectable()
export default class GameService {
  constructor(private readonly gameFactory: GameFactory, private readonly socketService: SocketService) {}

  send(gameId: string, event: GameEvent, game = this.gameFactory.get(gameId)) {
    if (event.type === 'ANSWER') {
      const { currentWord } = game.state.context;
      game.send({
        type: 'NEXT_GAME',
        word: event.word,
        reason: currentWord === event.word ? 'WIN' : !event.word ? 'SKIP' : 'LOSING',
      });
      return;
    }
    game.send(event);
  }

  connect(gameId: string, player: Player, game = this.gameFactory.get(gameId)) {
    const foundPlayer = game.state.context.players.filter(item => item.id === player.id)[0];
    if (foundPlayer) {
      foundPlayer.client = player.client;
      this.socketService.onReconnect(gameId, game, player);
      return;
    }

    this.send(gameId, {
      type: 'ADD_PLAYER',
      player,
    });
  }
}
