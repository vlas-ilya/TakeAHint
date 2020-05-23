import { Injectable } from '@nestjs/common';
import WordSet from '../classes/wordSet/WordSet';
import { pick } from '../utils/stream.utils';
import { uniqueRandomIndexes } from '../utils/random.utils';
import { words } from '../utils/words';

@Injectable()
export default class WordSetsService {
  createWordSets(countOfRounds: number): Array<WordSet> {
    const indexes = uniqueRandomIndexes(countOfRounds * 5, words.length);
    return [...Array(countOfRounds).keys()]
      .map(() => new WordSet())
      .map(
        pick(
          (item) =>
            (item.words = [
              words[indexes.shift()],
              words[indexes.shift()],
              words[indexes.shift()],
              words[indexes.shift()],
              words[indexes.shift()],
            ]),
        ),
      );
  }
}
