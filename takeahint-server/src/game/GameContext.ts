import ActivePlayer from '../player/ActivePlayer';
import WordSet from '../utils/WordSet';

interface GameContext {
  countOfRounds: number;
  countOfWin: number;
  players: Array<ActivePlayer>;
  wordSets: Array<WordSet>;
  currentWordSet: WordSet | null;
  currentWord: string;
  sequenceOfMasterPlayers: Array<number>;
}

export default GameContext;
