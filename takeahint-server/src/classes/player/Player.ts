import { Socket } from 'socket.io';

export default abstract class Player {
  protected constructor(public id: string, public client: Socket) {}
}
