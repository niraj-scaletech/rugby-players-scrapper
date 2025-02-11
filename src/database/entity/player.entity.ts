import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from './base';
import { CountryEntity } from './country.entity';

@Entity('players')
export class PlayerEntity extends Base {
    @Column({ type: 'varchar', length: 128 })
    name: string;

    @ManyToOne(() => CountryEntity, (country) => country.players, { cascade: true })
    country: CountryEntity;

    @Column({ type: 'varchar', length: 128, unique: true })
    slug: string;

    @Column({ type: 'varchar', length: 64, nullable: true })
    nationality: string;

    @Column({ type: 'int', nullable: true })
    age: number;

    @Column({ type: 'varchar', length: 16, nullable: true })
    height: string;

    @Column({ type: 'varchar', length: 16, nullable: true })
    weight: string;
}
