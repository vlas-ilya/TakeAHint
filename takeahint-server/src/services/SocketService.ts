import { Interpreter, State, StateSchema, Typestate } from 'xstate';

import ActivePlayer from '../beans/player/ActivePlayer';
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
    const master = context.players.find(item => item.isMaster);
    context.players.forEach(player => {
      player.client.emit('event', {
        type: 'START_GAME',
        isMaster: player.isMaster,
        countOfWin: context.countOfWin,
        countOfRounds: context.countOfRounds,
        master: master?.login,
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

    const ids = Array.from(context.currentWordSet.vote.keys());
    context.players
      .filter(player => !player.login)
      .forEach(player => {
        player.client.emit('event', {
          type: 'VOTED',
          notVotedPlayers: context.players
            .filter(item => !item.isMaster && item.login)
            .filter(item => !ids.includes(item.id))
            .map(item => item.login),
        });
      });
  }

  onEndChoiceWord(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, StateSchema<GameContext>, Typestate<GameContext>>,
  ) {}

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

    const ids = Array.from(context.currentWordSet.associations.keys());
    context.players
      .filter(player => !player.login)
      .forEach(player => {
        player.client.emit('event', {
          type: 'START_INPUT_ASSOCIATION',
          notReady: context.players
            .filter(item => !item.isMaster && item.login)
            .filter(item => !ids.includes(item.id))
            .map(item => item.login),
        });
      });
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
        associations: Array.from(context.currentWordSet.associations.values()).filter(item => item.valid),
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
          result:
            event.reason === 'WIN'
              ? 'Вы угадали слово!'
              : event.reason === 'LOSING'
              ? `Вам не удалось угадать слово:( Это не ${event.word}`
              : 'Вам не удалось угадать слово',
        });
      });
    }
  }

  onShowResult(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, any, Typestate<GameContext>>,
  ) {
    context.players.forEach(player => {
      player.client.emit('event', {
        type: 'SHOW_RESULT',
        id: context.statisticId,
      });
    });
  }

  onStartCheckAnswer(
    gameId: string,
    context: GameContext,
    event: GameEvent,
    state: State<GameContext, GameEvent, any, Typestate<GameContext>>,
  ) {
    if (event.type === 'CHECK_ANSWER') {
      context.players.forEach(player => {
        player.client.emit('event', {
          type: 'CHECK_ANSWER',
          word: event.word,
          answer: event.answer,
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
      master: '',
      notVotedPlayers: [],
      notReady: [],
      statisticId: '',
      answer: '',
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
        const master = game.state.context.players.find(item => item.isMaster);
        payload.master = master.login;

        if (!(player as ActivePlayer).login) {
          const ids = Array.from(game.state.context.currentWordSet.vote.keys());
          payload.notVotedPlayers = game.state.context.players
            .filter(item => !item.isMaster && item.login)
            .filter(item => !ids.includes(item.id))
            .map(item => item.login);
        }

        return 'choiceWord';
      },

      () => {
        payload.state = 'START_INPUT_ASSOCIATION';
        payload.word = payload.isMaster === false ? game.state.context.currentWord : '';

        if (!(player as ActivePlayer).login) {
          const ids = Array.from(game.state.context.currentWordSet.associations.keys());
          payload.notReady = game.state.context.players
            .filter(item => !item.isMaster && item.login)
            .filter(item => !ids.includes(item.id))
            .map(item => item.login);
        }

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
        payload.associations = Array.from(game.state.context.currentWordSet.associations.values()).filter(
          item => item.valid,
        );
        return 'answering';
      },

      () => {
        payload.state = 'CHECK_ANSWER';
        payload.word = game.state.context.currentWord;
        payload.answer = game.state.context.answer;
        return 'checkAnswer';
      },

      () => {
        payload.statisticId = game.state.context.statisticId;
        return 'showResult';
      },
    ].find(item => [game.state.value, game.state.value['game']].includes(item()));

    player.client.emit('event', payload);
  }
}
