import { resolve } from 'path';
import { ConnectionOptions, FileLogger } from 'typeorm';

const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,

  synchronize: false,

  migrationsRun: true,
  logging: true,
  logger: new FileLogger('all', {
    logPath: './logs/type-orm.log',
  }),

  entities: [resolve(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [resolve(__dirname, '../migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = ormConfig;
