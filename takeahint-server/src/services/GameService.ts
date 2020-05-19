import GameEvent from '../beans/game/GameEvent';
import GameFactory from './GameFactory';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class GameService {
  constructor(private readonly gameFactory: GameFactory) {}

  send(gameId: string, event: GameEvent, game = this.gameFactory.get(gameId)) {
    game.send(event);
  }
}
