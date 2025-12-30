import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FootballApiService {
  private readonly baseUrl = 'https://api.football-data.org/v4';

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  private headers() {
    return {
      'X-Auth-Token': this.config.get('FOOTBALL_API_TOKEN'),
    };
  }

  async getWorldCupTeams(worldCupId: number) {
    return this.get(`/competitions/${worldCupId}/teams`);
  }

  async getStandings(worldCupId: number) {
    return this.get(`/competitions/${worldCupId}/standings`);
  }

  async getTeam(teamId: number) {
    return this.get(`/teams/${teamId}`);
  }

  private async get(path: string, params?: any) {
    const res = await firstValueFrom(
      this.http.get(`${this.baseUrl}${path}`, {
        params,
        headers: this.headers(),
      }),
    );
    return res.data;
  }
}
