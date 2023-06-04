import 'dotenv/config';

import './app';
import './db/redis';
import './auth';

import { setupSequelize } from './db/sequelize';

async function main(): Promise<void> {
  await setupSequelize();
}

main();
