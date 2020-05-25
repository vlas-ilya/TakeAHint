export type StatisticLogin = string;
export type StatisticWordStatus = 'WIN' | 'LOSING' | 'SKIP';

export class StatisticPlayer {
  id: string;
  login: StatisticLogin;
  winCount: number = 0;
  losingCount: number = 0;
  skipCount: number = 0;
  goodAssociationsCount: number = 0;
  badAssociationsCount: number = 0;
}

export class StatisticAssociation {
  value: string;
  good: boolean;
  player: StatisticLogin;
}

export class StatisticWord {
  value: string;
  status: StatisticWordStatus;
  master: string;
  associations: Array<StatisticAssociation>;
}

export default class GameStatistic {
  id: string;
  players: Array<StatisticPlayer> = new Array<StatisticPlayer>();
  words: Array<StatisticWord> = new Array<StatisticWord>();
  countOfWinRounds: number = 0;
  countOfSkippedRounds: number = 0;
}
