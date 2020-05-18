import Color from './Color';
import Player from './Player';

export default class ActivePlayer extends Player {
  public isMaster: boolean = false;
  public login: String;
  public color?: Color;

  constructor(login: String) {
    super();
    this.login = login;
  }
}
