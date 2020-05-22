import GameEvent from '../beans/game/GameEvent';
import GameFactory from './GameFactory';
import { Injectable } from '@nestjs/common';
import Player from '../beans/player/Player';
import { Socket } from 'socket.io';
import SocketService from './SocketService';

@Injectable()
export default class GameService {
  constructor(private readonly gameFactory: GameFactory, private readonly socketService: SocketService) {}

  send(gameId: string, event: GameEvent, game = this.gameFactory.get(gameId)) {
    if (event.type === 'ANSWER') {
      GameService.answer(event, game);
      return;
    }
    if (event.type === 'CHECKED_ANSWER') {
      GameService.checkedAnswer(event, game);
      return;
    }
    game.send(event);
  }

  private static checkedAnswer(event, game) {
    game.send({
      type: 'NEXT_GAME',
      word: game.state.context.answer,
      reason: event.correct ? 'WIN' : 'LOSING',
    });
  }

  private static answer(event, game) {
    const { currentWord } = game.state.context;
    if (!event.word) {
      game.send({
        type: 'NEXT_GAME',
        word: event.word,
        reason: 'SKIP',
      });
      return;
    }
    if (currentWord.toLowerCase() === event.word.trim().toLowerCase()) {
      game.send({
        type: 'NEXT_GAME',
        word: event.word,
        reason: 'WIN',
      });
      return;
    }
    game.send({
      type: 'CHECK_ANSWER',
      answer: event.word,
      word: game.state.context.currentWord,
    });
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

  disconnect(client: Socket) {
    const game = this.gameFactory
      .getGames()
      .find(game => !!game.state.context.players.find(item => item.client === client));

    if (game) {
      const player = game.state.context.players.find(item => item.client === client);
      game.send({
        type: 'REMOVE_PLAYER',
        player,
      });
    }
  }
}
