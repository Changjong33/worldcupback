import { Injectable } from '@nestjs/common';
import { FootballApiService } from '../football-api/football-api.service';
import { WorldCupMapper } from './worldcup.mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class WorldCupService {
  private readonly worldCupId = 2000;

  constructor(
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    private readonly footballApi: FootballApiService,
  ) {}

  async getTeams() {
    return this.footballApi.getWorldCupTeams(this.worldCupId);
  }

  async getStandings() {
    return this.footballApi.getStandings(this.worldCupId);
  }

  async getTeamSquad(teamId: number) {
    const team = await this.footballApi.getTeam(teamId);
    return WorldCupMapper.mapTeamSquad(team);
  }

  async getWorldCupInfo() {
    const [teams, standings] = await Promise.all([
      this.getTeams(),
      this.getStandings(),
    ]);

    return {
      teams: teams.teams,
      groups: WorldCupMapper.organizeGroups(standings.standings),
    };
  }

  async createPlayer(dto: CreatePlayerDto): Promise<Player> {
    const player = this.playerRepository.create(dto);
    return await this.playerRepository.save(player);
  }
}
