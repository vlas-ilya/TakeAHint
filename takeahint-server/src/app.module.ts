import { GameController } from './controllers/GameController';
import GameCreatorService from './services/GameCreatorService';
import GameFactory from './services/GameFactory';
import GameService from './services/GameService';
import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import SequenceOfMasterService from './services/SequenceOfMasterService';
import SocketService from './services/SocketService';
import WordSetsService from './services/WordSetsService';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [WordSetsService, SequenceOfMasterService, GameCreatorService, GameService, GameFactory, SocketService],
})
export class AppModule {
  public static async bootstrap() {
    const app = await NestFactory.create(this);
    await app.listen(3000);
  }
}

const ignored = AppModule.bootstrap();
