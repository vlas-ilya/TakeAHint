import GameStatistic from '../beans/game/GameStatistic';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export default class GameStatisticService {
  private oldGames: Map<string, GameStatistic> = new Map<string, GameStatistic>();

  public put(game: GameStatistic): string {
    const id = uuid();
    this.oldGames.set(id, game);
    setTimeout(() => this.oldGames.delete(id), 1000 * 60 * 60 * 5);
    return id;
  }

  public get(id: string): GameStatistic {
    return this.oldGames.get(id);
  }
}
