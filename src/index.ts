import 'dotenv/config';

import './app';
import './db/redis';
import './auth';

import { setupSequelize } from './db/sequelize';

async function setup(): Promise<void> {
  await setupSequelize();
}

setup();
