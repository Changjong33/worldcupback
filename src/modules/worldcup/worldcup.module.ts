import { Module } from '@nestjs/common';
import { WorldCupService } from './worldcup.service';
import { WorldCupController } from './worldcup.controller';
import { FootballApiModule } from '../football-api/football-api.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Player]), FootballApiModule],
  controllers: [WorldCupController],
  providers: [WorldCupService],
})
export class WorldCupModule {}
