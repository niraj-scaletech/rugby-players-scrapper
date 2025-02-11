import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base';
import { PlayerEntity } from './player.entity';

@Entity('country')
export class CountryEntity extends Base {
  @Column({ type: 'varchar', length: 64 })
  name: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  slug: string;

  @OneToMany(() => PlayerEntity, (player) => player.country)
  players: PlayerEntity[];
}

