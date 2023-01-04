import 'dotenv/config';

import './app';
import './db/redis';
import { setupSequelize } from './db/sequelize';
import { setupPassport } from './auth';

async function setup(): Promise<void> {
  await setupSequelize();
  setupPassport();
}

setup();
