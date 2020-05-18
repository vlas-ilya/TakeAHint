import GameFactory from './GameFactory';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class GameService {
  constructor(private readonly gameFactory: GameFactory) {}

  sendCommand(gameId, command, game = this.gameFactory.get(gameId)) {
    game.send(command);
  }
}
