import { Module } from '@nestjs/common';
import { FootballApiService } from './football-api.service';
import { FootballApiController } from './football-api.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [FootballApiController],
  providers: [FootballApiService],
  exports: [FootballApiService],
})
export class FootballApiModule {}
