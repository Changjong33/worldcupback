import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20, nullable: true })
  position: string;

  @Column({ nullable: true })
  number: number;

  @Column({ name: 'country_tla', length: 3, nullable: true })
  countryTla?: string;

  @Column({ name: 'team_id', nullable: true })
  teamId?: number;

  @Column({ name: 'club_name' })
  clubName: string;

  @Column({ nullable: true })
  age: number;

  @Column({ name: 'photo_url' })
  photoUrl: string;

  @Column({ type: 'text', nullable: true, name: 'emblem_url' })
  emblemUrl: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
