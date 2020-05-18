import { State, StateSchema, Typestate } from 'xstate';

import GameContext from '../game/GameContext';
import GameEvent from '../game/GameEvent';
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
      --------- [Game id = ${gameId}, state = ${JSON.stringify(state.value)}] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
    `);
  }

  onAddPlayer(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, state = ${JSON.stringify(state.value)}] ---------
      [ event = ${JSON.stringify(event)} ]
      [ context = ${JSON.stringify(context)} ]
    `);
  }

  onRemovePlayer(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }

  onPrepareGame(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }

  onStartGame(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }

  onEndGame(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }

  onStartChoiceWord(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }

  onEndChoiceWord(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }

  onStartInputAssociations(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }

  onEndInputAssociations(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }

  onStartFilterAssociations(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }

  onMarkAssociationAsValid(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }

  onMarkAssociationAsInvalid(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }

  onEndFilterAssociations(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }

  onStartAnswering(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }

  onEndAnswering(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId} ] ---------
      [ event = ${event} ]
      [ context = ${context} ]
      [ state = ${state} ]
    `);
  }
}
