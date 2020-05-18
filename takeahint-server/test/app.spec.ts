import { Test, TestingModule } from '@nestjs/testing';

import ActivePlayer from '../src/player/ActivePlayer';
import { AppModule } from '../src/app.module';
import { GameController } from '../src/controllers/GameController';

describe('Application', () => {
  const GAME_ID = 'TEST';
  let gameController: GameController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    gameController = moduleFixture.get<GameController>(GameController);
  });

  it('test', () => {
    gameController.onMessage(GAME_ID, {
      type: 'ADD_PLAYER',
      player: new ActivePlayer('test-player-1'),
    });

    expect(true).toBeTruthy();
  });
});
