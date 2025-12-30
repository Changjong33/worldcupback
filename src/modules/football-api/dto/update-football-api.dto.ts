import { PartialType } from '@nestjs/mapped-types';
import { CreateFootballApiDto } from './create-football-api.dto';

export class UpdateFootballApiDto extends PartialType(CreateFootballApiDto) {}
