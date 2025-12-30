import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { WorldCupService } from './worldcup.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './entities/player.entity';

@Controller('api/worldcup')
export class WorldCupController {
  constructor(
    private readonly service: WorldCupService,
    private readonly worldCupService: WorldCupService,
  ) {}

  @Get('teams')
  getTeams() {
    return this.service.getTeams();
  }

  @Get('standings')
  getStandings() {
    return this.service.getStandings();
  }

  @Get('teams/:id/squad')
  getSquad(@Param('id', ParseIntPipe) id: number) {
    return this.service.getTeamSquad(id);
  }

  @Get('info')
  getInfo() {
    return this.service.getWorldCupInfo();
  }

  @Post('players')
  async create(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.worldCupService.createPlayer(createPlayerDto);
  }
}
