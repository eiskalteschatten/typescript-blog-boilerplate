import 'dotenv/config';

import './app';
import './auth';

import { setupSequelize } from './db';

async function main(): Promise<void> {
  await setupSequelize();
}

main();
