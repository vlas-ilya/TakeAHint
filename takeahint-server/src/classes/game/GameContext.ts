import ActivePlayer from '../player/ActivePlayer';
import GameStatistic from './GameStatistic';
import WordSet from '../wordSet/WordSet';

interface GameContext {
  answer: string;
  countOfRounds: number;
  countOfWin: number;
  players: Array<ActivePlayer>;
  wordSets: Array<WordSet>;
  currentWordSet: WordSet | null;
  currentWord: string;
  sequenceOfMasterPlayers: Array<number>;
  oldWords: Array<string>;
  gameStatistic: GameStatistic;
}

export default GameContext;
