import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'node:path';

import { FilmsController } from './films/films.controller';
import { FilmsService } from './films/films.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { Film } from './repository/entities/film.entity';
import { Schedule } from './repository/entities/schedule.entity';
import { FILMS_REPOSITORY } from './repository/films.repository.interface';
import { FilmsTypeOrmRepository } from './repository/films.typeorm.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const driver = configService.get<string>('DATABASE_DRIVER', 'postgres');

        if (driver !== 'postgres') {
          throw new Error(
            `Unsupported DATABASE_DRIVER: ${driver}. Expected postgres.`,
          );
        }

        return {
          type: driver as 'postgres',
          host: configService.get<string>('DATABASE_HOST', 'localhost'),
          port: configService.get<number>('DATABASE_PORT', 5432),
          username: configService.get<string>('DATABASE_USERNAME', 'prac'),
          password: configService.get<string>('DATABASE_PASSWORD', 'prac'),
          database: configService.get<string>('DATABASE_NAME', 'prac'),
          entities: [Film, Schedule],
          synchronize: false,
        };
      },
    }),
    TypeOrmModule.forFeature([Film, Schedule]),
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),
  ],
  controllers: [FilmsController, OrderController],
  providers: [
    FilmsService,
    OrderService,
    {
      provide: FILMS_REPOSITORY,
      useClass: FilmsTypeOrmRepository,
    },
  ],
})
export class AppModule {}
