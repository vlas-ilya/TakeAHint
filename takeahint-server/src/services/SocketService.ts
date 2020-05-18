import { State, StateSchema, Typestate } from 'xstate';

import GameContext from '../beans/game/GameContext';
import GameEvent from '../beans/game/GameEvent';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class SocketService {
  // TODO

  onCreateGame(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onCreateGame] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onAddPlayer(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onAddPlayer] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onRemovePlayer(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onRemovePlayer] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onPrepareGame(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onPrepareGame] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onStartGame(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onStartGame] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onEndGame(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onEndGame] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onStartChoiceWord(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onStartChoiceWord] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onEndChoiceWord(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onEndChoiceWord] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onStartInputAssociations(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onStartInputAssociations] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onEndInputAssociations(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onEndInputAssociations] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onStartFilterAssociations(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onStartFilterAssociations] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onMarkAssociationAsValid(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onMarkAssociationAsValid] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onMarkAssociationAsInvalid(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onMarkAssociationAsInvalid] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onEndFilterAssociations(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onEndFilterAssociations] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onStartAnswering(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onStartAnswering] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onEndAnswering(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onEndAnswering] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }
}
