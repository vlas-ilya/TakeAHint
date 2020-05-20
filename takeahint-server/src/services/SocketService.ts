import { Interpreter, State, StateSchema, Typestate } from 'xstate';

import GameContext from '../beans/game/GameContext';
import GameEvent from '../beans/game/GameEvent';
import GameStateSchema from '../beans/game/GameStateSchema';
import { Injectable } from '@nestjs/common';
import Player from '../beans/player/Player';

@Injectable()
export default class SocketService {
  onCreateGame(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onCreateGame] ---------
      [ event = ${JSON.stringify(event.type)} ]
      [ context = {JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onAddPlayer(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    context.players.forEach(player => {
      player.client.emit('event', {
        type: 'ADD_PLAYER',
        players: context.players.map(({ login, color, id }) => ({
          login,
          color,
          id,
        })),
      });
    });
  }

  onRemovePlayer(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    this.onAddPlayer(gameId, context, event, state);
  }

  onPrepareGame(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onPrepareGame] ---------
      [ event = ${JSON.stringify(event.type)} ]
      [ context = {JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onStartGame(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    context.players.forEach(player => {
      player.client.emit('event', {
        type: 'START_GAME',
        isMaster: player.isMaster,
        countOfWin: context.countOfWin,
        countOfRounds: context.countOfRounds,
      });
    });
  }

  onEndGame(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onEndGame] ---------
      [ event = ${JSON.stringify(event.type)} ]
      [ context = {JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onStartChoiceWord(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    if (event.type !== 'VOTE') {
      context.players.forEach(player => {
        player.client.emit('event', {
          type: 'START_CHOICE_WORD',
          words: player.isMaster === false ? context.currentWordSet.words : [],
        });
      });
    }
  }

  onEndChoiceWord(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onEndChoiceWord] ---------
      [ event = ${JSON.stringify(event.type)} ]
      [ context = {JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onStartInputAssociations(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    if (event.type !== 'INPUT_ASSOCIATION') {
      context.players.forEach(player => {
        player.client.emit('event', {
          type: 'START_INPUT_ASSOCIATION',
          word: player.isMaster === false ? context.currentWord : '',
        });
      });
    }
  }

  onEndInputAssociations(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onEndInputAssociations] ---------
      [ event = ${JSON.stringify(event.type)} ]
      [ context = {JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onStartFilterAssociations(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    context.players.forEach(player => {
      player.client.emit('event', {
        type: 'START_FILTER_ASSOCIATIONS',
        associations: player.isMaster === false ? Array.from(context.currentWordSet.associations.values()) : [],
      });
    });
  }

  onMarkAssociationAsValid(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    console.log(`
      --------- [Game id = ${gameId}, event = onMarkAssociationAsValid] ---------
      [ event = ${JSON.stringify(event.type)} ]
      [ context = {JSON.stringify(context)} ]
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
      [ event = ${JSON.stringify(event.type)} ]
      [ context = {JSON.stringify(context)} ]
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
      [ event = ${JSON.stringify(event.type)} ]
      [ context = {JSON.stringify(context)} ]
      [ state = ${JSON.stringify(state.value)} ]
    `);
  }

  onStartAnswering(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    context.players.forEach(player => {
      player.client.emit('event', {
        type: 'START_ANSWERING',
        associations: player.isMaster
          ? Array.from(context.currentWordSet.associations.values()).filter(item => item.valid)
          : [],
      });
    });
  }

  onEndAnswering(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {
    if (event.type === 'NEXT_GAME') {
      context.players.forEach(player => {
        player.client.emit('event', {
          type: 'FINISH',
          result: event.reason,
        });
      });
    }
  }

  onReconnect(
    gameId: string,
    game: Interpreter<GameContext, GameStateSchema, GameEvent, Typestate<GameContext>>,
    player: Player,
  ) {
    const payload = {
      type: 'RECONNECT',
      state: '',
      players: [],
      isMaster: false,
      words: [],
      word: '',
      associations: [],
      countOfWin: 0,
      countOfRounds: 0,
    };
    [
      () => {
        payload.state = 'ADD_PLAYER';
        payload.players = game.state.context.players.map(({ login, color, id }) => ({
          login,
          color,
          id,
        }));
        return 'waitPlayers';
      },

      () => {
        payload.state = 'START_CHOICE_WORD';
        payload.isMaster = game.state.context.players.find(item => item.id === player.id)?.isMaster;
        payload.words = payload.isMaster === false ? game.state.context.currentWordSet.words : [];
        payload.countOfWin = game.state.context.countOfWin;
        payload.countOfRounds = game.state.context.countOfRounds;
        return 'choiceWord';
      },

      () => {
        payload.state = 'START_INPUT_ASSOCIATION';
        payload.word = payload.isMaster === false ? game.state.context.currentWord : '';
        return 'inputAssociations';
      },

      () => {
        payload.state = 'START_FILTER_ASSOCIATIONS';
        payload.associations =
          payload.isMaster === false ? Array.from(game.state.context.currentWordSet.associations.values()) : [];
        return 'filterAssociations';
      },

      () => {
        payload.state = 'START_ANSWERING';
        payload.associations = payload.isMaster
          ? Array.from(game.state.context.currentWordSet.associations.values()).filter(item => item.valid)
          : [];
        return 'answering';
      },

      () => {
        return 'showResult';
      },
    ].find(item => item() === game.state.value['game']);

    player.client.emit('event', payload);
  }
}
