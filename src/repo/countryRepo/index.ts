import { Injectable } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { AppDataSource } from 'src/database/connection';
import { CountryEntity } from 'src/database/entity';

@Injectable()
export class CountryRepo extends Repository<CountryEntity> {
  protected connection = AppDataSource;
  constructor(protected dataSource: DataSource) {
    super(CountryEntity, dataSource.createEntityManager());
  }
}
