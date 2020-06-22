import { Injectable } from '@nestjs/common';
import WordSet from '../classes/wordSet/WordSet';
import WordsService from './WordsService';
import { pick } from '../utils/stream.utils';
import { uniqueRandomIndexes } from '../utils/random.utils';

@Injectable()
export default class WordSetsService {
  constructor(private readonly wordsService: WordsService) {}

  async createWordSets(countOfRounds: number): Promise<Array<WordSet>> {
    const wordsLength = await this.wordsService.count();
    const indexes = uniqueRandomIndexes(countOfRounds * 5, wordsLength);
    const words = await this.wordsService.getWords(indexes);
    return [...Array(countOfRounds).keys()]
      .map(() => new WordSet())
      .map(
        pick((item) => {
          item.words = [words.shift(), words.shift(), words.shift(), words.shift(), words.shift()];
        }),
      );
  }
}
