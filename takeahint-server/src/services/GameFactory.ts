import { Interpreter, interpret } from 'xstate';
import { MachineOptions, Typestate } from 'xstate/lib/types';

import GameContext from '../beans/game/GameContext';
import GameCreatorService from './GameCreatorService';
import GameEvent from '../beans/game/GameEvent';
import GameStateSchema from '../beans/game/GameStateSchema';
import { Injectable } from '@nestjs/common';
import SocketService from './SocketService';

@Injectable()
export default class GameFactory {
  static readonly GAME_LIVE_INTERVAL = 1000 * 60 * 60 * 5;

  private readonly games: Map<
    String,
    Interpreter<GameContext, GameStateSchema, GameEvent, Typestate<GameContext>>
  > = new Map();
  private readonly gameUpdates: Map<String, Date> = new Map<String, Date>();

  constructor(private readonly gameCreatorService: GameCreatorService, private readonly socketService: SocketService) {
    setInterval(() => {
      for (let key of this.games.keys()) {
        const game = this.games.get(key);
        const lastUpdate = this.gameUpdates.get(key);
        const interval = new Date().getTime() - lastUpdate.getTime();
        if (
          interval > GameFactory.GAME_LIVE_INTERVAL ||
          game.state.value === 'showResult' ||
          game.state.value['game'] === 'showResult'
        ) {
          this.games.delete(key);
          this.gameUpdates.delete(key);
        }
      }
    }, 1000 * 10);
  }

  private getGameConfig(gameId: string, id = gameId.toLowerCase()): Partial<MachineOptions<GameContext, GameEvent>> {
    return {
      actions: {
        onCreateGame: (context: GameContext, event: GameEvent) =>
          this.socketService.onCreateGame(gameId, context, event, this.get(id).state),

        onAddPlayer: (context: GameContext, event: GameEvent) =>
          this.socketService.onAddPlayer(gameId, context, event, this.get(id).state),

        onRemovePlayer: (context: GameContext, event: GameEvent) =>
          this.socketService.onRemovePlayer(gameId, context, event, this.get(id).state),

        onPrepareGame: (context: GameContext, event: GameEvent) =>
          this.socketService.onPrepareGame(gameId, context, event, this.get(id).state),

        onStartGame: (context: GameContext, event: GameEvent) =>
          this.socketService.onStartGame(gameId, context, event, this.get(id).state),

        onEndGame: (context: GameContext, event: GameEvent) =>
          this.socketService.onEndGame(gameId, context, event, this.get(id).state),

        onStartChoiceWord: (context: GameContext, event: GameEvent) =>
          this.socketService.onStartChoiceWord(gameId, context, event, this.get(id).state),

        onEndChoiceWord: (context: GameContext, event: GameEvent) =>
          this.socketService.onEndChoiceWord(gameId, context, event, this.get(id).state),

        onStartInputAssociations: (context: GameContext, event: GameEvent) =>
          this.socketService.onStartInputAssociations(gameId, context, event, this.get(id).state),

        onEndInputAssociations: (context: GameContext, event: GameEvent) =>
          this.socketService.onEndInputAssociations(gameId, context, event, this.get(id).state),

        onStartFilterAssociations: (context: GameContext, event: GameEvent) =>
          this.socketService.onStartFilterAssociations(gameId, context, event, this.get(id).state),

        onMarkAssociationAsValid: (context: GameContext, event: GameEvent) =>
          this.socketService.onMarkAssociationAsValid(gameId, context, event, this.get(id).state),

        onMarkAssociationAsInvalid: (context: GameContext, event: GameEvent) =>
          this.socketService.onMarkAssociationAsInvalid(gameId, context, event, this.get(id).state),

        onEndFilterAssociations: (context: GameContext, event: GameEvent) =>
          this.socketService.onEndFilterAssociations(gameId, context, event, this.get(id).state),

        onStartAnswering: (context: GameContext, event: GameEvent) =>
          this.socketService.onStartAnswering(gameId, context, event, this.get(id).state),

        onEndAnswering: (context: GameContext, event: GameEvent) =>
          this.socketService.onEndAnswering(gameId, context, event, this.get(id).state),

        onShowResult: (context: GameContext, event: GameEvent) =>
          this.socketService.onShowResult(gameId, context, event, this.get(id).state),

        onStartCheckAnswer: (context: GameContext, event: GameEvent) =>
          this.socketService.onStartCheckAnswer(gameId, context, event, this.get(id).state),
      },
    };
  }

  get(gameId: string, id = gameId.toLowerCase()) {
    this.gameUpdates.set(id, new Date());
    if (!this.games.has(id)) {
      const game = this.gameCreatorService.create();
      const gameConfig = this.getGameConfig(id);
      const stateNode = game.withConfig(gameConfig);
      const interpreter = interpret<GameContext, GameStateSchema, GameEvent, Typestate<GameContext>>(stateNode).start();
      this.games.set(id, interpreter);
    }
    return this.games.get(id);
  }

  getGames() {
    return Array.from(this.games.values());
  }
}
