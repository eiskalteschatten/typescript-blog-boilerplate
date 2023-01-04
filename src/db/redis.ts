import { createClient, RedisClientOptions } from 'redis';
import config from 'config';

import logger from '~/lib/logger';

const redisConfig = config.get<RedisClientOptions>('redis');
const redisClient = createClient(redisConfig);

redisClient.connect().then(() => {
  logger.info('The connection to Redis has been established successfully.');

  redisClient.on('end', () => logger.warn('The connection to Redis has ended.'));
  redisClient.on('reconnecting', () => logger.warn('Reconnecting to Redis.'));
  redisClient.on('error', error => logger.error('Unable to connect to Redis!', error));
}).catch(error => logger.error('Unable to connect to Redis!', error));

export default redisClient;
