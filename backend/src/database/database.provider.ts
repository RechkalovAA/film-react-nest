import mongoose from 'mongoose';
import { AppConfig } from '../app.config.provider';

export const databaseProvider = {
  provide: 'DATABASE',
  useFactory: async (config: AppConfig) => {
    await mongoose.connect(config.database.url);
    return mongoose.connection;
  },
  inject: ['CONFIG'],
};
