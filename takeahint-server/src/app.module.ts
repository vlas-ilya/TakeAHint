import { GameController } from './controllers/GameController';
import GameCreatorService from './services/GameCreatorService';
import GameFactory from './services/GameFactory';
import GameService from './services/GameService';
import GameStatisticService from './services/GameStatisticService';
import { Module } from '@nestjs/common';
import QrCodeController from './controllers/QrCodeController';
import SequenceOfMasterService from './services/SequenceOfMasterService';
import SocketGateway from './controllers/SocketGateway';
import SocketService from './services/SocketService';
import WordSetsService from './services/WordSetsService';

@Module({
  imports: [],
  controllers: [GameController, QrCodeController],
  providers: [
    WordSetsService,
    SequenceOfMasterService,
    GameCreatorService,
    GameService,
    GameFactory,
    SocketService,
    SocketGateway,
    GameStatisticService,
  ],
})
export class AppModule {}
