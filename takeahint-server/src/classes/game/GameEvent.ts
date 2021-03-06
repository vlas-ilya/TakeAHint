import Association from '../wordSet/Association';
import NextGameReason from './NextGameReason';
import Player from '../player/Player';

type GameEvent =
  | { type: 'CREATE' }
  | { type: 'ADD_PLAYER'; player: Player }
  | { type: 'REMOVE_PLAYER'; player: Player }
  | { type: 'VOTE'; index: number; player: Player }
  | {
      type: 'TRY_CHOOSE_WORD';
      words: Array<string>;
      vote: Array<number>;
      players: Array<Player>;
    }
  | { type: 'CHOOSE_WORD'; currentWord: string }
  | { type: 'INPUT_ASSOCIATION'; association: string; player: Player }
  | {
      type: 'TRY_FILTER_ASSOCIATIONS';
      associations: Map<String, Association>;
      neededAssociationsCount: number;
    }
  | { type: 'FILTER_ASSOCIATIONS'; associations: Map<String, Association> }
  | { type: 'MARK_AS_VALID'; id: string }
  | { type: 'MARK_AS_INVALID'; id: string }
  | { type: 'GO_TO_ANSWER' }
  | { type: 'TRY_TO_ANSWERING'; associations: Map<String, Association> }
  | { type: 'ANSWER'; word: string; player: Player }
  | { type: 'NEXT_GAME'; reason: NextGameReason; word?: string }
  | { type: 'CHECK_ANSWER'; word: string; answer: string }
  | { type: 'CHECKED_ANSWER'; correct: boolean }
  | { type: 'FINISH' };

export default GameEvent;
