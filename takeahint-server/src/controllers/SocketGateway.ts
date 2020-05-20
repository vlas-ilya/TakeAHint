import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

import ActivePlayer from '../beans/player/ActivePlayer';
import GameService from '../services/GameService';
import ObserverPlayer from '../beans/player/ObserverPlayer';
import { Socket } from 'socket.io';
import { v4 as uuid } from 'uuid';

class SocketPayload {
  gameId: string;
  id?: string;
  login?: string;
}

@WebSocketGateway()
export default class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly gameService: GameService) {}

  @SubscribeMessage('connection')
  handleMessage(client: Socket, { login, gameId, id = uuid() }: SocketPayload): void {
    const player = login ? new ActivePlayer(id, login, client) : new ObserverPlayer(id, client);

    client.emit('connected', { id });

    this.gameService.connect(gameId, player);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log();
  }

  handleDisconnect(client: Socket) {
    console.log();
  }
}
