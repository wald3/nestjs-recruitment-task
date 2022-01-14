import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { resolve } from 'path';
import { FileLogger } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { joiSchema } from './configs';
import { MoviesModule } from './movies/movies.module';

// TODO path to migrations fix

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, ...joiSchema }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        database: configService.get('POSTGRES_DB'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),

        synchronize: false,

        migrationsRun: true,
        logging: true,
        logger: new FileLogger('all', {
          logPath: './logs/type-orm.log',
        }),

        entities: [resolve(__dirname, './**/*.entity{.ts,.js}')],
        migrations: [resolve(__dirname, './migrations/*{.ts,.js}')],
        cli: {
          migrationsDir: 'src/migrations',
        },
      }),
    }),
    MoviesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
