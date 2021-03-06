import GameStatistic, { StatisticAssociation, StatisticPlayer, StatisticWord } from '../classes/game/GameStatistic';
import { Machine, Receiver, Sender, StateMachine, Typestate, assign, send } from 'xstate';
import { forClass, forItem, forItems, pass, pick } from '../utils/stream.utils';

import ActivePlayer from '../classes/player/ActivePlayer';
import Association from '../classes/wordSet/Association';
import GameContext from '../classes/game/GameContext';
import GameEvent from '../classes/game/GameEvent';
import GameStateSchema from '../classes/game/GameStateSchema';
import GameStatisticService from './GameStatisticService';
import { Injectable } from '@nestjs/common';
import Player from '../classes/player/Player';
import SequenceOfMasterService from './SequenceOfMasterService';
import WordSetsService from './WordSetsService';
import { getDuplicateIndexes } from '../utils/array.utils';
import { randomElement } from '../utils/random.utils';

@Injectable()
export default class GameCreatorService {
  constructor(
    private readonly sequenceOfMasterService: SequenceOfMasterService,
    private readonly wordSetsService: WordSetsService,
    private readonly gameStatisticService: GameStatisticService,
  ) {}

  private static setColor(player: Player): Player {
    if (player instanceof ActivePlayer) {
      player.color = '#000000';
    }
    return player;
  }

  private addPlayer = assign({
    players: (context: GameContext, event: GameEvent) =>
      event.type === 'ADD_PLAYER' ? [...context.players, GameCreatorService.setColor(event.player)] : context.players,
  });

  private removePlayer = assign({
    players: (context: GameContext, event: GameEvent) =>
      event.type === 'REMOVE_PLAYER' ? context.players.filter((item) => item !== event.player) : context.players,
  });

  private initSequenceOfMasterPlayers = assign({
    sequenceOfMasterPlayers: (context: GameContext) =>
      this.sequenceOfMasterService.generate(context.players, context.countOfRounds),
  });

  private updateMasterGamer = assign({
    players: (context: GameContext) =>
      context.players
        .map(
          forClass(
            ActivePlayer,
            pick((item) => (item.isMaster = false)),
          ),
        )
        .map(
          forItem(
            context.sequenceOfMasterPlayers[0],
            pick((item) => (item.isMaster = true)),
          ),
        ),

    sequenceOfMasterPlayers: (context: GameContext) => context.sequenceOfMasterPlayers.slice(1),
  });

  private updateCurrentWordSet = assign({
    currentWordSet: (context: GameContext) => context.wordSets[0],
    wordSets: (context: GameContext) => context.wordSets.slice(1),
  });

  private decreaseCountOfRounds = assign({
    countOfRounds: (context: GameContext) => context.countOfRounds - 1,
  });

  private increaseCountOfWinIfWin = assign({
    countOfWin: (context: GameContext, event: GameEvent) =>
      event.type === 'NEXT_GAME' && event.reason === 'WIN' ? context.countOfWin + 1 : context.countOfWin,
  });

  private decreaseCountOfRoundsIfLosing = assign({
    countOfRounds: (context: GameContext, event: GameEvent) =>
      event.type === 'NEXT_GAME' && event.reason === 'LOSING' ? context.countOfRounds - 1 : context.countOfRounds,
  });

  private hasRounds = (context: GameContext) => context.countOfRounds > 0;

  private vote = assign({
    currentWordSet: (context: GameContext, event: GameEvent) => {
      if (event.type !== 'VOTE' || context.currentWordSet === null) {
        return context.currentWordSet;
      }
      const player = context.players.find((item) => item.id === event.player.id);
      if (player instanceof ActivePlayer && !player.isMaster) {
        context.currentWordSet.vote.set(event.player.id, event.index);
      }
      return context.currentWordSet;
    },
  });

  private getPlayers = (players: Array<Player>): number =>
    players
      .filter((item: Player) => item instanceof ActivePlayer)
      .map((item) => item as ActivePlayer)
      .filter((item: ActivePlayer) => !item.isMaster).length;

  private toChooseWordIfEveryoneVoted = send(
    (context: GameContext) => ({
      type: 'TRY_CHOOSE_WORD',
      words: context.currentWordSet?.words,
      vote: context.currentWordSet?.vote,
      players: context.players,
    }),
    { to: 'chooseWordService' },
  );

  private chooseWordService = () => (cb: Sender<GameEvent>, onReceive: Receiver<GameEvent>) => {
    onReceive((event: GameEvent) => {
      if (event.type !== 'TRY_CHOOSE_WORD') {
        return;
      }
      let vote = Array.from(event.vote.values()).reduce((acc: Array<number>, index: number) => {
        if (!acc[index]) {
          acc[index] = 0;
        }
        acc[index] += 1;
        return acc;
      }, []);

      const sum = vote.reduce((a: number, b: number) => a + b);
      if (sum < this.getPlayers(event.players)) {
        return;
      }

      const max = Math.max(...vote.filter(Boolean));
      const indexes = vote.flatMap((item, index) => (item === max ? [index] : []));
      const newWordIndex = randomElement(indexes);
      const currentWord = event.words[newWordIndex];

      cb({ type: 'CHOOSE_WORD', currentWord });
    });
  };

  private saveAssociation = assign({
    currentWordSet: (context: GameContext, event: GameEvent) => {
      if (event.type !== 'INPUT_ASSOCIATION' || context.currentWordSet === null) {
        return context.currentWordSet;
      }

      if ('login' in event.player) {
        const player = event.player as ActivePlayer;

        if (!player.isMaster) {
          context.currentWordSet.associations.set(player.id, new Association(event.association));
        }
      }

      return context.currentWordSet;
    },
  });

  private getNeededAssociationsCount = (context: GameContext): number => {
    /*if (this.getPlayers(context.players) === 2) {
      return 4;
    }*/
    return this.getPlayers(context.players);
  };

  private toFilterAssociationsIfEveryoneDone = send(
    (context: GameContext) => ({
      type: 'TRY_FILTER_ASSOCIATIONS',
      associations: context.currentWordSet?.associations,
      neededAssociationsCount: this.getNeededAssociationsCount(context),
    }),
    { to: 'filterAssociationsService' },
  );

  private filterAssociationsService = () => (cb: Sender<GameEvent>, onReceive: Receiver<GameEvent>) =>
    onReceive((event: GameEvent) => {
      if (event.type !== 'TRY_FILTER_ASSOCIATIONS') {
        return;
      }
      let associations = Array.from(event.associations.values());
      if (associations.length < event.neededAssociationsCount) {
        return;
      }
      associations.map(
        forItems(
          getDuplicateIndexes(associations),
          pick((item: Association) => (item.valid = false)),
        ),
      );

      cb({ type: 'FILTER_ASSOCIATIONS', associations: event.associations });
    });

  private filterAssociations = assign((context: GameContext, event: GameEvent) => {
    if (event.type === 'FILTER_ASSOCIATIONS' && context.currentWordSet?.associations !== undefined) {
      context.currentWordSet.associations = event.associations;
      return { currentWordSet: context.currentWordSet };
    }
  });

  private markAssociationAsValid = assign((context: GameContext, event: GameEvent) => {
    if (event.type === 'MARK_AS_VALID' && context.currentWordSet?.associations !== undefined) {
      Array.from(context.currentWordSet.associations.values()).find(
        (item) => item.id === event.id,
      ).markedAsValid = true;
      return { currentWordSet: context.currentWordSet };
    }
  });

  private markAssociationAsInvalid = assign((context: GameContext, event: GameEvent) => {
    if (event.type === 'MARK_AS_INVALID' && context.currentWordSet?.associations !== undefined) {
      Array.from(context.currentWordSet.associations.values()).find(
        (item) => item.id === event.id,
      ).markedAsValid = false;
      return { currentWordSet: context.currentWordSet };
    }
  });

  private filterMarkedAssociations = assign((context: GameContext) => {
    if (context.currentWordSet?.associations !== undefined) {
      Array.from(context.currentWordSet.associations.values()).forEach(
        (association) => (association.valid = association.valid && association.markedAsValid),
      );
      return { currentWordSet: context.currentWordSet };
    }
  });

  private saveCurrentWord = assign((context: GameContext, event: GameEvent) => {
    if (event.type === 'CHOOSE_WORD') {
      return { currentWord: event.currentWord, oldWords: [...context.oldWords, event.currentWord] };
    }
  });

  private toAnsweringIfHasAssociations = send(
    (context: GameContext) => ({
      type: 'TRY_TO_ANSWERING',
      associations: context.currentWordSet?.associations,
    }),
    { to: 'toAnsweringService' },
  );

  private toAnsweringService = () => (cb: Sender<GameEvent>, onReceive: Receiver<GameEvent>) =>
    onReceive((event: GameEvent) => {
      if (event.type !== 'TRY_TO_ANSWERING') {
        return;
      }
      if (Array.from(event.associations.values()).some((item) => item.valid)) {
        cb({ type: 'GO_TO_ANSWER' });
      } else {
        cb({ type: 'NEXT_GAME', reason: 'SKIP' });
      }
    });

  private saveGameStatistic = assign((context: GameContext) => ({
    gameStatistic: this.gameStatisticService.put(context.gameStatistic),
  }));

  private saveAnswer = assign((context: GameContext, event: GameEvent) => {
    if (event.type === 'CHECK_ANSWER') {
      return { answer: event.answer };
    }
  });

  private savePlayersToStatistic = (context: GameContext) => {
    context.gameStatistic.players = context.players.map((player) => {
      const statisticPlayer = new StatisticPlayer();
      statisticPlayer.id = player.id;
      statisticPlayer.login = player.login;
      return statisticPlayer;
    });
  };

  private saveAssociationToStatistic = (context: GameContext) => {
    const statisticWord = new StatisticWord();
    statisticWord.associations = Array.from(context.currentWordSet.associations.entries()).map(
      ([userId, association]) => {
        const player = context.players.find((player) => player.id === userId);
        const statisticPlayer = context.gameStatistic.players.find((player) => player.id === userId);
        const statisticAssociation = new StatisticAssociation();
        statisticAssociation.value = association.value;
        statisticAssociation.good = association.valid;
        statisticAssociation.player = player.login;
        statisticPlayer.goodAssociationsCount += statisticAssociation.good ? 1 : 0;
        statisticPlayer.badAssociationsCount += statisticAssociation.good ? 0 : 1;
        return statisticAssociation;
      },
    );
    const master = context.players.find((player) => player.isMaster);
    statisticWord.master = master.login;
    context.gameStatistic.words.push(statisticWord);
  };

  private saveRoundInfoToStatistic = assign((context: GameContext, event: GameEvent) => {
    const statisticWord = context.gameStatistic.words[context.gameStatistic.words.length - 1];
    statisticWord.value = context.currentWord;
    if (event.type === 'NEXT_GAME') {
      statisticWord.status = event.reason;
    }
    const master = context.players.find((player) => player.isMaster);
    const statisticPlayerMaster = context.gameStatistic.players.find((player) => player.id === master.id);
    statisticPlayerMaster.winCount += statisticWord.status === 'WIN' ? 1 : 0;
    statisticPlayerMaster.losingCount += statisticWord.status === 'LOSING' ? 1 : 0;
    statisticPlayerMaster.skipCount += statisticWord.status === 'SKIP' ? 1 : 0;
    context.gameStatistic.countOfWinRounds += statisticWord.status === 'WIN' ? 1 : 0;
    context.gameStatistic.countOfSkippedRounds += statisticWord.status === 'SKIP' ? 1 : 0;

    return {
      gameStatistic: context.gameStatistic,
    };
  });

  public create = async (): Promise<StateMachine<GameContext, GameStateSchema, GameEvent, Typestate<GameContext>>> => {
    const countOfRounds = 13;
    const wordSets = await this.wordSetsService.createWordSets(countOfRounds);

    return Machine<GameContext, GameStateSchema, GameEvent>(
      {
        key: 'game',
        initial: 'waitPlayers',

        context: {
          answer: '',
          countOfRounds,
          countOfWin: 0,
          players: [],
          wordSets,
          currentWordSet: null,
          currentWord: null,
          sequenceOfMasterPlayers: [],
          oldWords: [],
          gameStatistic: new GameStatistic(),
        },

        invoke: [
          {
            id: 'chooseWordService',
            src: this.chooseWordService,
          },
          {
            id: 'filterAssociationsService',
            src: this.filterAssociationsService,
          },
          {
            id: 'toAnsweringService',
            src: this.toAnsweringService,
          },
        ],

        states: {
          waitPlayers: {
            on: {
              CREATE: {
                target: 'prepareGame',
                actions: [this.initSequenceOfMasterPlayers, this.savePlayersToStatistic, 'onCreateGame'],
              },
              ADD_PLAYER: {
                target: 'waitPlayers',
                actions: [this.addPlayer, 'onAddPlayer'],
              },
              REMOVE_PLAYER: {
                target: 'waitPlayers',
                actions: [this.removePlayer, 'onRemovePlayer'],
              },
            },
          },
          prepareGame: {
            entry: [this.updateMasterGamer, this.updateCurrentWordSet, 'onPrepareGame'],
            on: {
              '': [
                {
                  target: 'game',
                  cond: this.hasRounds,
                },
                {
                  target: 'showResult',
                },
              ],
            },
          },
          game: {
            initial: 'choiceWord',
            entry: [this.decreaseCountOfRounds, 'onStartGame'],
            exit: [
              this.saveRoundInfoToStatistic,
              this.increaseCountOfWinIfWin,
              this.decreaseCountOfRoundsIfLosing,
              'onEndGame',
            ],

            on: {
              NEXT_GAME: 'prepareGame',
            },

            states: {
              choiceWord: {
                entry: ['onStartChoiceWord'],
                exit: ['onEndChoiceWord'],
                on: {
                  VOTE: {
                    target: 'choiceWord',
                    actions: [this.vote, this.toChooseWordIfEveryoneVoted],
                  },
                  CHOOSE_WORD: {
                    target: 'inputAssociations',
                    actions: [this.saveCurrentWord],
                  },
                },
              },
              inputAssociations: {
                entry: ['onStartInputAssociations'],
                exit: ['onEndInputAssociations'],
                on: {
                  INPUT_ASSOCIATION: {
                    target: 'inputAssociations',
                    actions: [this.saveAssociation, this.toFilterAssociationsIfEveryoneDone],
                  },
                  FILTER_ASSOCIATIONS: {
                    target: 'filterAssociations',
                    actions: [this.filterAssociations],
                  },
                },
              },
              filterAssociations: {
                entry: ['onStartFilterAssociations'],
                exit: ['onEndFilterAssociations'],
                on: {
                  GO_TO_ANSWER: {
                    target: 'answering',
                    actions: [this.toAnsweringIfHasAssociations],
                  },
                  MARK_AS_VALID: {
                    target: 'filterAssociations',
                    actions: [this.markAssociationAsValid, 'onMarkAssociationAsValid'],
                  },
                  MARK_AS_INVALID: {
                    target: 'filterAssociations',
                    actions: [this.markAssociationAsInvalid, 'onMarkAssociationAsInvalid'],
                  },
                },
              },
              answering: {
                entry: [this.filterMarkedAssociations, this.saveAssociationToStatistic, 'onStartAnswering'],
                exit: ['onEndAnswering'],
                on: {
                  CHECK_ANSWER: 'checkAnswer',
                },
              },
              checkAnswer: {
                entry: [this.saveAnswer, 'onStartCheckAnswer'],
                exit: ['onEndAnswering'],
              },
            },
          },
          showResult: {
            entry: [this.saveGameStatistic, 'onShowResult', 'onRemoveGame'],
          },
        },
      },
      {
        actions: {
          onCreateGame: pass,
          onAddPlayer: pass,
          onRemovePlayer: pass,
          onPrepareGame: pass,
          onStartGame: pass,
          onEndGame: pass,
          onStartChoiceWord: pass,
          onEndChoiceWord: pass,
          onStartInputAssociations: pass,
          onEndInputAssociations: pass,
          onStartFilterAssociations: pass,
          onMarkAssociationAsValid: pass,
          onMarkAssociationAsInvalid: pass,
          onEndFilterAssociations: pass,
          onStartAnswering: pass,
          onEndAnswering: pass,
          onShowResult: pass,
          onStartCheckAnswer: pass,
          onRemoveGame: pass,
        },
      },
    );
  };
}
