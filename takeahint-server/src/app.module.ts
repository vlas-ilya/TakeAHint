import { GameController } from './controllers/GameController';
import GameCreatorService from './services/GameCreatorService';
import GameFactory from './services/GameFactory';
import GameService from './services/GameService';
import GameStatisticService from './services/GameStatisticService';
import { Module } from '@nestjs/common';
import QrCodeController from './controllers/QrCodeController';
import SequenceOfMasterService from './services/SequenceOfMasterService';
import { ServeStaticModule } from '@nestjs/serve-static';
import SocketController from './controllers/SocketController';
import SocketService from './services/SocketService';
import WordSetsService from './services/WordSetsService';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'takeahint-client', 'build'),
    }),
  ],
  controllers: [GameController, QrCodeController],
  providers: [
    WordSetsService,
    SequenceOfMasterService,
    GameCreatorService,
    GameService,
    GameFactory,
    SocketService,
    SocketController,
    GameStatisticService,
  ],
})
export class AppModule {}
