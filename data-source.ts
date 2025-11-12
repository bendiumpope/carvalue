import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

let dataSourceOptions: DataSourceOptions;

switch (process.env.NODE_ENV) {
  case 'development':
    dataSourceOptions = {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: ['src/**/*.entity.ts', 'dist/**/*.entity.js'],
      migrations: ['migrations/*.ts', 'dist/migrations/*.js'],
      synchronize: false,
    };
    break;

  case 'test':
    dataSourceOptions = {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: ['src/**/*.entity.ts'],
      migrations: ['migrations/*.ts'],
      synchronize: false,
    };
    break;

  case 'production':
    dataSourceOptions = {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      synchronize: false,
      ssl: { rejectUnauthorized: false },
    };
    break;

  default:
    throw new Error('❌ Unknown NODE_ENV in data-source.ts');
}

export const AppDataSource = new DataSource(dataSourceOptions);
