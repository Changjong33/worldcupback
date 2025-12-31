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
    private readonly playerRepository: Repository<Player>,
    private readonly footballApi: FootballApiService,
  ) {}

  async getTeams() {
    return this.footballApi.getWorldCupTeams(this.worldCupId);
  }

  async getStandings() {
    return this.footballApi.getStandings(this.worldCupId);
  }

  async getTeamPlayers(teamId: number) {
    // 1️⃣ 외부 API에서 팀 정보
    const team = await this.footballApi.getTeam(teamId);

    if (!team) {
      throw new Error('팀 정보를 찾을 수 없습니다.');
    }

    // 2️⃣ DB에서 선수단 조회 (tla 우선, 없으면 teamId)
    const players = team.tla
      ? await this.playerRepository.find({
          where: { countryTla: team.tla },
          order: { number: 'ASC' },
        })
      : await this.playerRepository.find({
          where: { teamId: team.id },
          order: { number: 'ASC' },
        });

    // 3️⃣ 포지션별 분류
    const squad = {
      Goalkeeper: players.filter((p) => p.position === 'GK'),
      Defender: players.filter((p) => p.position === 'DF'),
      Midfielder: players.filter((p) => p.position === 'MF'),
      Attacker: players.filter((p) => p.position === 'FW'),
    };

    // 4️⃣ 최종 응답
    return {
      id: team.id,
      name: team.name,
      tla: team.tla ?? null, // Curaçao 대응
      crest: team.crest,
      squad,
      players, // 전체 리스트
    };
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
