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
  private readonly games: Map<
    String,
    Interpreter<GameContext, GameStateSchema, GameEvent, Typestate<GameContext>>
  > = new Map();

  constructor(private readonly gameCreatorService: GameCreatorService, private readonly socketService: SocketService) {}

  private getGameConfig(gameId: string): Partial<MachineOptions<GameContext, GameEvent>> {
    return {
      actions: {
        onCreateGame: (context: GameContext, event: GameEvent) =>
          this.socketService.onCreateGame(gameId, context, event, this.get(gameId).state),

        onAddPlayer: (context: GameContext, event: GameEvent) =>
          this.socketService.onAddPlayer(gameId, context, event, this.get(gameId).state),

        onRemovePlayer: (context: GameContext, event: GameEvent) =>
          this.socketService.onRemovePlayer(gameId, context, event, this.get(gameId).state),

        onPrepareGame: (context: GameContext, event: GameEvent) =>
          this.socketService.onPrepareGame(gameId, context, event, this.get(gameId).state),

        onStartGame: (context: GameContext, event: GameEvent) =>
          this.socketService.onStartGame(gameId, context, event, this.get(gameId).state),

        onEndGame: (context: GameContext, event: GameEvent) =>
          this.socketService.onEndGame(gameId, context, event, this.get(gameId).state),

        onStartChoiceWord: (context: GameContext, event: GameEvent) =>
          this.socketService.onStartChoiceWord(gameId, context, event, this.get(gameId).state),

        onEndChoiceWord: (context: GameContext, event: GameEvent) =>
          this.socketService.onEndChoiceWord(gameId, context, event, this.get(gameId).state),

        onStartInputAssociations: (context: GameContext, event: GameEvent) =>
          this.socketService.onStartInputAssociations(gameId, context, event, this.get(gameId).state),

        onEndInputAssociations: (context: GameContext, event: GameEvent) =>
          this.socketService.onEndInputAssociations(gameId, context, event, this.get(gameId).state),

        onStartFilterAssociations: (context: GameContext, event: GameEvent) =>
          this.socketService.onStartFilterAssociations(gameId, context, event, this.get(gameId).state),

        onMarkAssociationAsValid: (context: GameContext, event: GameEvent) =>
          this.socketService.onMarkAssociationAsValid(gameId, context, event, this.get(gameId).state),

        onMarkAssociationAsInvalid: (context: GameContext, event: GameEvent) =>
          this.socketService.onMarkAssociationAsInvalid(gameId, context, event, this.get(gameId).state),

        onEndFilterAssociations: (context: GameContext, event: GameEvent) =>
          this.socketService.onEndFilterAssociations(gameId, context, event, this.get(gameId).state),

        onStartAnswering: (context: GameContext, event: GameEvent) =>
          this.socketService.onStartAnswering(gameId, context, event, this.get(gameId).state),

        onEndAnswering: (context: GameContext, event: GameEvent) =>
          this.socketService.onEndAnswering(gameId, context, event, this.get(gameId).state),
      },
    };
  }

  get(gameId: string) {
    if (!this.games.has(gameId)) {
      const game = this.gameCreatorService.create();
      const gameConfig = this.getGameConfig(gameId);
      const stateNode = game.withConfig(gameConfig);
      const interpreter = interpret<GameContext, GameStateSchema, GameEvent, Typestate<GameContext>>(stateNode).start();
      this.games.set(gameId, interpreter);
    }
    return this.games.get(gameId);
  }
}
