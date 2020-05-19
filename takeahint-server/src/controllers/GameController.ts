import { Body, Controller, Param, Post } from '@nestjs/common';

import GameEvent from '../beans/game/GameEvent';
import GameService from '../services/GameService';
import { throwIf } from '../utils/utils';

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
  ];

  constructor(private readonly gameService: GameService) {}

  @Post(':game-id/command')
  onMessage(
    @Param('game-id') gameId: string,
    @Body() event: GameEvent
  ) {
    throwIf(!GameController.VALID_COMMANDS.includes(event.type), 'Unsupported');
    throwIf(!GameController.commandValid(event), 'Invalid');

    this.gameService.send(gameId, event);
  }

  private static commandValid(event: GameEvent): boolean {
    return true; // TODO
  }
}
