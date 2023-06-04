import { Options, Sequelize } from 'sequelize';
import config from 'config';
import { setupMigration, migrate } from 'sequelize-migration-wrapper';
import path from 'path';

import logger from '~/lib/logger';

const options = config.get<Options>('db');

const sequelize = new Sequelize(options);

export default sequelize;

setupMigration({
  sequelize,
  path: path.resolve(__dirname, './migrations'),
  filePattern: /\.ts|\.js$/,
});

export async function setupSequelize(): Promise<Sequelize> {
  try {
    await sequelize.authenticate();
    logger.info('The connection to MariaDB has been established successfully.');

    if (process.env.DISABLE_DB_MIGRATION !== 'true') {
      await migrate();
      logger.info('MariaDB migration scripts successfully executed.');
    }
  }
  catch (error) {
    logger.error('Unable to connect to MariaDB: ' + error);
  }

  return sequelize;
}
