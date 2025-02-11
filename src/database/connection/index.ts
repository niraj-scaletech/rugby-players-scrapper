import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USERNAME,
} from '../../config';

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  password: DB_PASSWORD,
  username: DB_USERNAME,
  database: DB_NAME,
  entities: [path.join(__dirname, '../entity/**/*.entity.{ts,js}')],
  migrations: [path.join(__dirname, '../migrations/**/*.{ts,js}')],
  migrationsTableName: 'migrations',
  logging: true,
};

export const AppDataSource = new DataSource(ormConfig);
