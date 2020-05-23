import Player from './Player';
import { Socket } from 'socket.io';

export default class ObserverPlayer extends Player {
  constructor(id: string, client: Socket) {
    super(id, client);
  }
}
