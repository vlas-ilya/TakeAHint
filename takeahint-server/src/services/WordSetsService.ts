import { Injectable } from '@nestjs/common';
import WordSet from '../beans/wordSet/WordSet';
import { pick } from '../utils/stream.utils';

@Injectable()
export default class WordSetsService {
  createWordSets(countOfRounds: number): Array<WordSet> {
    // TODO
    return [...Array(countOfRounds).keys()]
      .map(() => new WordSet())
      .map(pick(item => (item.words = ['qwe', 'wer', 'ert', 'rty', 'tyu'])));
  }
}
