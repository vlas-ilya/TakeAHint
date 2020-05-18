import ActivePlayer from '../beans/player/ActivePlayer';
import { Injectable } from '@nestjs/common';
import Player from '../beans/player/Player';
import { shuffle } from '../utils/array.utils';

@Injectable()
export default class SequenceOfMasterService {
  public generate(players: Array<Player>, countOfRounds: number): Array<number> {
    const indexes = players.flatMap((player, index) => (player instanceof ActivePlayer ? [index] : []));
    shuffle(indexes);
    return [...Array(countOfRounds).keys()].map(item => indexes[item % indexes.length]);
  }
}
