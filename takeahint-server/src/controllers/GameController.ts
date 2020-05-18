import { Body, Controller, Param, Post } from '@nestjs/common';

import GameEvent from '../game/GameEvent';
import GameService from '../services/GameService';
import { throwIf } from '../utils/utils';

@Controller('game')
export class GameController {
  private static readonly VALID_COMMANDS = [
    'ADD_PLAYER',
    'CREATE',
    'VOTE',
    'INPUT_ASSOCIATION',
    'MARK_AS_VALID',
    'MARK_AS_INVALID',
    'GO_TO_ANSWER',
  ];

  constructor(private readonly gameService: GameService) {}

  @Post(':game-id/command')
  onMessage(
    @Param('game-id') gameId: string,
    @Body() command: GameEvent
  ) {
    throwIf(!GameController.VALID_COMMANDS.includes(command.type), 'Unsupported');
    throwIf(!GameController.commandValid(command), 'Invalid');

    this.gameService.sendCommand(gameId, command);
  }

  private static commandValid(command: GameEvent): boolean {
    console.log(command);
    return true; // TODO
  }
}
