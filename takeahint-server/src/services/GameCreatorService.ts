import { Machine, Receiver, Sender, StateMachine, Typestate, assign, send } from 'xstate';
import { forClass, forItem, forItems, pass, pick } from '../utils/stream.utils';

import ActivePlayer from '../beans/player/ActivePlayer';
import Association from '../beans/wordSet/Association';
import GameContext from '../beans/game/GameContext';
import GameEvent from '../beans/game/GameEvent';
import GameStateSchema from '../beans/game/GameStateSchema';
import { Injectable } from '@nestjs/common';
import Player from '../beans/player/Player';
import SequenceOfMasterService from './SequenceOfMasterService';
import WordSetsService from './WordSetsService';
import { getDuplicateIndexes } from '../utils/array.utils';
import { randomElement } from '../utils/random.utils';

@Injectable()
export default class GameCreatorService {
  constructor(
    private readonly sequenceOfMasterService: SequenceOfMasterService,
    private readonly wordSetsService: WordSetsService,
  ) {}

  private addPlayer = assign({
    players: (context: GameContext, event: GameEvent) =>
      // TODO: set color to player
      event.type === 'ADD_PLAYER' ? [...context.players, event.player] : context.players,
  });

  private removePlayer = assign({
    players: (context: GameContext, event: GameEvent) =>
      event.type === 'REMOVE_PLAYER' ? context.players.filter(item => item !== event.player) : context.players,
  });

  private initWordSets = assign({
    wordSets: (context: GameContext) => this.wordSetsService.createWordSets(context.countOfRounds),
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
            pick(item => {
              if (item !== undefined) {
                item.isMaster = false;
              }
            }),
          ),
        )
        .map(
          forItem(
            context.sequenceOfMasterPlayers[0],
            pick(item => (item.isMaster = true)),
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
      if (context.currentWordSet.vote[event.index] === undefined) {
        context.currentWordSet.vote[event.index] = 0;
      }
      context.currentWordSet.vote[event.index] += 1;
      return context.currentWordSet;
    },
  });

  private getPlayers = (players: Array<Player>): number =>
    players
      .filter((item: Player) => item instanceof ActivePlayer)
      .map(item => item as ActivePlayer)
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

  private tryChooseWord = () => (cb: Sender<GameEvent>, onReceive: Receiver<GameEvent>) => {
    onReceive((event: GameEvent) => {
      if (event.type !== 'TRY_CHOOSE_WORD') {
        return;
      }
      const sum = event.vote.reduce((a: number, b: number) => a + b);
      if (sum < this.getPlayers(event.players)) {
        return;
      }

      const max = Math.max(...event.vote.filter(Boolean));
      const indexes = event.vote.flatMap((item, index) => (item === max ? [index] : []));
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

      if (event.player instanceof ActivePlayer && !event.player.isMaster) {
        context.currentWordSet.associations.set(
          `${event.player.login} (${event.player.color})`,
          new Association(event.association),
        );
      }

      return context.currentWordSet;
    },
  });

  private getNeededAssociationsCount = (context: GameContext): number => {
    if (this.getPlayers(context.players) === 2) {
      return 4;
    }
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

  private tryFilterAssociations = () => (cb: Sender<GameEvent>, onReceive: Receiver<GameEvent>) => {
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
  };

  private filterAssociations = assign((context: GameContext, event: GameEvent) => {
    if (event.type === 'FILTER_ASSOCIATIONS' && context.currentWordSet?.associations !== undefined) {
      context.currentWordSet.associations = event.associations;
      return { currentWordSet: context.currentWordSet };
    }
  });

  private markAssociationAsValid = assign((context: GameContext, event: GameEvent) => {
    if (event.type === 'MARK_AS_VALID' && context.currentWordSet?.associations !== undefined) {
      Array.from(context.currentWordSet.associations.values())[event.associationIndex].valid = true;
      return { currentWordSet: context.currentWordSet };
    }
  });

  private markAssociationAsInvalid = assign((context: GameContext, event: GameEvent) => {
    if (event.type === 'MARK_AS_INVALID' && context.currentWordSet?.associations !== undefined) {
      Array.from(context.currentWordSet.associations.values())[event.associationIndex].valid = false;
      return { currentWordSet: context.currentWordSet };
    }
  });

  private saveCurrentWord = assign((context: GameContext, event: GameEvent) => {
    if (event.type === 'CHOOSE_WORD') {
      return { currentWord: event.currentWord };
    }
  });

  public create = (): StateMachine<GameContext, GameStateSchema, GameEvent, Typestate<GameContext>> => {
    return Machine<GameContext, GameStateSchema, GameEvent>(
      {
        key: 'game',
        initial: 'waitPlayers',

        context: {
          countOfRounds: 13,
          countOfWin: 0,
          players: [],
          wordSets: [],
          currentWordSet: null,
          currentWord: null,
          sequenceOfMasterPlayers: [],
        },

        invoke: [
          {
            id: 'chooseWordService',
            src: this.tryChooseWord,
          },
          {
            id: 'filterAssociationsService',
            src: this.tryFilterAssociations,
          },
        ],

        states: {
          waitPlayers: {
            on: {
              CREATE: {
                target: 'prepareGame',
                actions: [this.initWordSets, this.initSequenceOfMasterPlayers, 'onCreateGame'],
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
            exit: [this.increaseCountOfWinIfWin, this.decreaseCountOfRoundsIfLosing, 'onEndGame'],

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
                  GO_TO_ANSWER: 'answering',
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
                entry: ['onStartAnswering'],
                exit: ['onEndAnswering'],
              },
            },
          },
          showResult: {
            entry: ['onShowResult'],
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
        },
      },
    );
  };
}
