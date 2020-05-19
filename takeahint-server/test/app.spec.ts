import { Test, TestingModule } from '@nestjs/testing';

import ActivePlayer from '../src/beans/player/ActivePlayer';
import { AppModule } from '../src/app.module';
import { GameController } from '../src/controllers/GameController';
import GameService from '../src/services/GameService';
import ObserverPlayer from '../src/beans/player/ObserverPlayer';

describe('Application', () => {
  const GAME_ID = 'TEST';
  let gameController: GameController;
  let gameService: GameService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    gameController = moduleFixture.get<GameController>(GameController);
    gameService = moduleFixture.get<GameService>(GameService);
  });

  it('test', () => {
    gameService.sendCommand(GAME_ID, {
      type: 'ADD_PLAYER',
      player: new ActivePlayer('test-player-1'),
    });
    gameService.sendCommand(GAME_ID, {
      type: 'ADD_PLAYER',
      player: new ActivePlayer('test-player-2'),
    });
    gameService.sendCommand(GAME_ID, {
      type: 'ADD_PLAYER',
      player: new ActivePlayer('test-player-3'),
    });
    gameService.sendCommand(GAME_ID, {
      type: 'ADD_PLAYER',
      player: new ActivePlayer('test-player-4'),
    });
    gameService.sendCommand(GAME_ID, {
      type: 'ADD_PLAYER',
      player: new ActivePlayer('test-player-5'),
    });
    gameService.sendCommand(GAME_ID, {
      type: 'ADD_PLAYER',
      player: new ActivePlayer('test-player-6'),
    });
    gameService.sendCommand(GAME_ID, {
      type: 'ADD_PLAYER',
      player: new ActivePlayer('test-player-7'),
    });
    gameService.sendCommand(GAME_ID, {
      type: 'ADD_PLAYER',
      player: new ObserverPlayer(),
    });
    gameController.onMessage(GAME_ID, {
      type: 'CREATE',
    });
    expect(true).toBeTruthy();
  });
});
