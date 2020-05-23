import { Interpreter, Typestate } from 'xstate';

import GameContext from '../classes/game/GameContext';
import GameEvent from '../classes/game/GameEvent';
import GameStateSchema from '../classes/game/GameStateSchema';
import { Injectable } from '@nestjs/common';
import Player from '../classes/player/Player';

@Injectable()
export default class SocketService {
  onAddPlayer(gameId: string, context: GameContext) {
    context.players.forEach((player) => {
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

  onRemovePlayer(gameId: string, context: GameContext) {
    this.onAddPlayer(gameId, context);
  }

  onStartGame(gameId: string, context: GameContext) {
    const master = context.players.find((item) => item.isMaster);
    context.players.forEach((player) => {
      player.client.emit('event', {
        type: 'START_GAME',
        isMaster: player.isMaster,
        countOfWin: context.countOfWin,
        countOfRounds: context.countOfRounds,
        master: master?.login,
      });
    });
  }

  onStartChoiceWord(gameId: string, context: GameContext, event: GameEvent) {
    if (event.type !== 'VOTE') {
      context.players.forEach((player) => {
        player.client.emit('event', {
          type: 'START_CHOICE_WORD',
          words: player.isMaster === false ? context.currentWordSet.words : [],
        });
      });
    }

    const ids = Array.from(context.currentWordSet.vote.keys());
    context.players
      .filter((player) => !player.login || player.isMaster)
      .forEach((player) => {
        player.client.emit('event', {
          type: 'VOTED',
          notVotedPlayers: context.players
            .filter((item) => !item.isMaster && item.login)
            .filter((item) => !ids.includes(item.id))
            .map((item) => item.login),
        });
      });
  }

  onStartInputAssociations(gameId: string, context: GameContext, event: GameEvent) {
    if (event.type !== 'INPUT_ASSOCIATION') {
      context.players.forEach((player) => {
        player.client.emit('event', {
          type: 'START_INPUT_ASSOCIATION',
          word: player.isMaster === false ? context.currentWord : '',
        });
      });
    }

    const ids = Array.from(context.currentWordSet.associations.keys());
    context.players
      .filter((player) => !player.login || player.isMaster)
      .forEach((player) => {
        player.client.emit('event', {
          type: 'START_INPUT_ASSOCIATION',
          notReady: context.players
            .filter((item) => !item.isMaster && item.login)
            .filter((item) => !ids.includes(item.id))
            .map((item) => item.login),
        });
      });
  }

  onStartFilterAssociations(gameId: string, context: GameContext) {
    context.players.forEach((player) => {
      player.client.emit('event', {
        type: 'START_FILTER_ASSOCIATIONS',
        associations: player.isMaster === false ? Array.from(context.currentWordSet.associations.values()) : [],
      });
    });
  }

  onStartAnswering(gameId: string, context: GameContext) {
    context.players.forEach((player) => {
      player.client.emit('event', {
        type: 'START_ANSWERING',
        associations: Array.from(context.currentWordSet.associations.values()).filter((item) => item.valid),
      });
    });
  }

  onEndAnswering(gameId: string, context: GameContext, event: GameEvent) {
    if (event.type === 'NEXT_GAME') {
      context.players.forEach((player) => {
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

  onShowResult(gameId: string, context: GameContext) {
    context.players.forEach((player) => {
      player.client.emit('event', {
        type: 'SHOW_RESULT',
        id: context.statisticId,
      });
    });
  }

  onStartCheckAnswer(gameId: string, context: GameContext, event: GameEvent) {
    if (event.type === 'CHECK_ANSWER') {
      context.players.forEach((player) => {
        player.client.emit('event', {
          type: 'CHECK_ANSWER',
          word: event.word,
          answer: event.answer,
        });
      });
    }
  }

  private filterPlayers = (ids, game) =>
    game.state.context.players
      .filter((item) => !item.isMaster && item.login)
      .filter((item) => !ids.includes(item.id))
      .map((item) => item.login);

  onReconnect(
    gameId: string,
    game: Interpreter<GameContext, GameStateSchema, GameEvent, Typestate<GameContext>>,
    player: Player,
  ) {
    const realPlayer = game.state.context.players.find((item) => item.id === player.id);
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
        payload.isMaster = game.state.context.players.find((item) => item.id === player.id)?.isMaster;
        payload.words = payload.isMaster === false ? game.state.context.currentWordSet.words : [];
        payload.countOfWin = game.state.context.countOfWin;
        payload.countOfRounds = game.state.context.countOfRounds;
        const master = game.state.context.players.find((item) => item.isMaster);
        payload.master = master.login;

        if (!realPlayer.login || realPlayer.isMaster) {
          const ids = Array.from(game.state.context.currentWordSet.vote.keys());
          payload.notVotedPlayers = this.filterPlayers(ids, game);
        }

        return 'choiceWord';
      },

      () => {
        payload.state = 'START_INPUT_ASSOCIATION';
        payload.word = payload.isMaster === false ? game.state.context.currentWord : '';

        if (!realPlayer.login || realPlayer.isMaster) {
          const ids = Array.from(game.state.context.currentWordSet.associations.keys());
          payload.notReady = this.filterPlayers(ids, game);
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
          (item) => item.valid,
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
    ].find((item) => [game.state.value, game.state.value['game']].includes(item()));

    player.client.emit('event', payload);
  }
}
