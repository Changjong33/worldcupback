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

  @Column({ length: 3 })
  countryTla: string;

  @Column({ length: 100, nullable: true })
  clubName: string;

  @Column({ nullable: true })
  age: number;

  @Column({ length: 255, nullable: true })
  photoUrl: string;

  @Column({ type: 'text', nullable: true })
  emblemUrl: string;

  @Column({ nullable: true })
  debutYear: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
