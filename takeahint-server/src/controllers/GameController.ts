import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import GameEvent from '../beans/game/GameEvent';
import GameService from '../services/GameService';
import GameStatisticService from '../services/GameStatisticService';
import { throwIf } from '../utils/errors.utils';

@Controller('game')
export class GameController {
  private static readonly VALID_COMMANDS = [
    'CREATE',
    'VOTE',
    'INPUT_ASSOCIATION',
    'MARK_AS_VALID',
    'MARK_AS_INVALID',
    'GO_TO_ANSWER',
    'ANSWER',
    'CHECKED_ANSWER',
  ];

  constructor(private readonly gameService: GameService, private readonly gameStatisticService: GameStatisticService) {}

  @Post(':gameId/command')
  onMessage(@Param('gameId') gameId: string, @Body() event: GameEvent) {
    throwIf(!GameController.commandValid(event), 'Invalid');
    this.gameService.send(gameId, event);
  }

  private static commandValid(event: GameEvent): boolean {
    throwIf(!GameController.VALID_COMMANDS.includes(event.type), 'Unsupported');
    return true;
  }

  @Get('statistic/:id')
  getStatistic(@Param('id') id: string) {
    return this.gameStatisticService.get(id);
  }
}
