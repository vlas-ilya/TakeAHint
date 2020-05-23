import Player from './Player';
import { Socket } from 'socket.io';

export default class ActivePlayer extends Player {
  public isMaster: boolean = false;
  public login: string;
  public color?: string;

  constructor(id: string, login: string, client: Socket) {
    super(id, client);
    this.login = login;
  }
}
