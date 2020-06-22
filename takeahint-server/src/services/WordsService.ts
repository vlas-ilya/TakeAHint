import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { OnModuleInit } from '@nestjs/common/interfaces/hooks/on-init.interface';
import { Word } from '../classes/wordSet/Word';
import { words } from '../utils/words';

@Injectable()
export default class WordsService implements OnModuleInit {
  private connected: Boolean;

  constructor(@InjectModel(Word.name) private wordModel: Model<Word>) {}

  async onModuleInit() {
    this.connected = await this.isWorked();
  }

  async count(): Promise<number> {
    if (!this.connected) {
      return words.length;
    }
    try {
      const count = await this.wordModel.countDocuments();
      if (count === 0) {
        console.error('wordsService.count returned 0');
        this.connected = false;
        return words.length;
      }
      return count;
    } catch (e) {
      console.error(e);
      this.connected = false;
      return words.length;
    }
  }

  public async getWord(position: number): Promise<String> {
    if (!this.connected) {
      return words[position];
    }
    try {
      const word = await this.get(position);
      return word.word;
    } catch (e) {
      console.error(e);
      this.connected = false;
      return words[position];
    }
  }

  public async getWords(indexes: Array<number>) {
    const result = [];
    for (const position of indexes) {
      result.push(await this.getWord(position));
    }
    return result;
  }

  private async get(position: number): Promise<Word> {
    return this.wordModel
      .find()
      .skip(position)
      .limit(1)
      .exec()
      .then((list) => list[0]);
  }

  private async isWorked(): Promise<Boolean> {
    try {
      await this.count();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
