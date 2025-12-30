import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { FootballApiService } from './football-api.service';

@Controller('football-api')
export class FootballApiController {
  constructor(private readonly footballApiService: FootballApiService) {}

  @Get('teams/:worldCupId')
  getWorldCupTeams(@Param('worldCupId', ParseIntPipe) worldCupId: number) {
    return this.footballApiService.getWorldCupTeams(worldCupId);
  }

  @Get('standings/:worldCupId')
  getStandings(@Param('worldCupId', ParseIntPipe) worldCupId: number) {
    return this.footballApiService.getStandings(worldCupId);
  }

  @Get('team/:teamId')
  getTeam(@Param('teamId', ParseIntPipe) teamId: number) {
    return this.footballApiService.getTeam(teamId);
  }
}
