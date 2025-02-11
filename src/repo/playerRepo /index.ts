import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { AppDataSource } from 'src/database/connection';
import { PlayerEntity } from 'src/database/entity';

@Injectable()
export class PlayerRepo extends Repository<PlayerEntity> {
  protected connection = AppDataSource;
  constructor(protected dataSource: DataSource) {
    super(PlayerEntity, dataSource.createEntityManager());
  }
}
