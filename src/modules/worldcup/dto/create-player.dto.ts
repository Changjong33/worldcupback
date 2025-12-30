import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsNumber()
  @IsOptional()
  number?: number;

  @IsString()
  countryTla: string; // "URU", "KOR" 등

  @IsString()
  @IsOptional()
  clubName?: string;

  @IsNumber()
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  photoUrl?: string;

  @IsString()
  @IsOptional()
  emblemUrl?: string;
}
