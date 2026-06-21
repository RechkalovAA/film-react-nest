import { ConfigService } from '@nestjs/config';

export const configProvider = {
  provide: 'CONFIG',
  useFactory: (configService: ConfigService): AppConfig => ({
    database: {
      driver: configService.get<string>('DATABASE_DRIVER'),
      host: configService.get<string>('DATABASE_HOST'),
      port: configService.get<number>('DATABASE_PORT'),
      name: configService.get<string>('DATABASE_NAME'),
      username: configService.get<string>('DATABASE_USERNAME'),
      password: configService.get<string>('DATABASE_PASSWORD'),
    },
  }),
  inject: [ConfigService],
};

export interface AppConfig {
  database: AppConfigDatabase;
}

export interface AppConfigDatabase {
  driver: string;
  host: string;
  port: number;
  name: string;
  username: string;
  password: string;
}
