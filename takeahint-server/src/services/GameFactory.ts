import { Interpreter, interpret } from 'xstate';
import { MachineOptions, Typestate } from 'xstate/lib/types';

import GameContext from '../classes/game/GameContext';
import GameCreatorService from './GameCreatorService';
import GameEvent from '../classes/game/GameEvent';
import GameStateSchema from '../classes/game/GameStateSchema';
import { Injectable } from '@nestjs/common';
import SocketService from './SocketService';

@Injectable()
export default class GameFactory {
  static readonly GAME_LIVE_INTERVAL = 1000 * 60 * 60 * 5;

  private readonly games: Map<
    String,
    Interpreter<GameContext, GameStateSchema, GameEvent, Typestate<GameContext>>
  > = new Map();
  private readonly gameTimeUpdates: Map<String, Date> = new Map<String, Date>();
  private readonly startingGames: Map<string, Promise<void>> = new Map();

  constructor(private readonly gameCreatorService: GameCreatorService, private readonly socketService: SocketService) {
    setInterval(() => {
      for (let key of this.games.keys()) {
        const lastUpdate = this.gameTimeUpdates.get(key);
        const interval = new Date().getTime() - lastUpdate.getTime();
        if (interval > GameFactory.GAME_LIVE_INTERVAL) {
          this.games.delete(key);
          this.gameTimeUpdates.delete(key);
          console.log(`${new Date()} | GameFactory | removed game ${key}`);
          console.log(`${new Date()} | GameFactory | total games ${this.games.size}`);
        }
      }
    }, 1000 * 10);
  }

  private getGameConfig = (gameId: string): Partial<MachineOptions<GameContext, GameEvent>> => ({
    actions: {
      onAddPlayer: (context) => this.socketService.onAddPlayer(gameId, context),
      onRemovePlayer: (context) => this.socketService.onRemovePlayer(gameId, context),
      onStartGame: (context) => this.socketService.onStartGame(gameId, context),
      onStartChoiceWord: (context, event) => this.socketService.onStartChoiceWord(gameId, context, event),
      onStartInputAssociations: (context, event) => this.socketService.onStartInputAssociations(gameId, context, event),
      onStartFilterAssociations: (context) => this.socketService.onStartFilterAssociations(gameId, context),
      onStartAnswering: (context) => this.socketService.onStartAnswering(gameId, context),
      onEndAnswering: (context, event) => this.socketService.onEndAnswering(gameId, context, event),
      onShowResult: (context) => this.socketService.onShowResult(gameId, context),
      onStartCheckAnswer: (context, event) => this.socketService.onStartCheckAnswer(gameId, context, event),
      onRemoveGame: () => {
        this.games.delete(gameId);
        this.gameTimeUpdates.delete(gameId);
        console.log(`${new Date()} | GameFactory | removed game ${gameId}`);
        console.log(`${new Date()} | GameFactory | total games ${this.games.size}`);
      },
    },
  });

  async get(gameId: string, id = gameId.toLowerCase()) {
    this.gameTimeUpdates.set(id, new Date());
    await this.startingGames.get(id);

    if (!this.games.has(id)) {
      this.startingGames.set(id, this.createGame(id));
      await this.startingGames.get(id);
      this.startingGames.delete(id);
    }
    return this.games.get(id);
  }

  private async createGame(id: string): Promise<void> {
    const game = await this.gameCreatorService.create();
    const stateNode = game.withConfig(this.getGameConfig(id));
    const interpreter = interpret<GameContext, GameStateSchema, GameEvent, Typestate<GameContext>>(stateNode).start();
    this.games.set(id, interpreter);
    this.gameTimeUpdates.delete(id);
    console.log(`${new Date()} | GameFactory | created game ${id}`);
    console.log(`${new Date()} | GameFactory | total games ${this.games.size}`);
  }

  getGames() {
    return Array.from(this.games.values());
  }
}
