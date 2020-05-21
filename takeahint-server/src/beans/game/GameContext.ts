import ActivePlayer from '../player/ActivePlayer';
import WordSet from '../wordSet/WordSet';

interface GameContext {
  countOfRounds: number;
  countOfWin: number;
  players: Array<ActivePlayer>;
  wordSets: Array<WordSet>;
  currentWordSet: WordSet | null;
  currentWord: string;
  sequenceOfMasterPlayers: Array<number>;
  oldWords: Array<string>;
  statisticId: string;
}

export default GameContext;
