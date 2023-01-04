require('dotenv').config();

module.exports = {
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    ssl: process.env.POSTGRES_SSL === 'true',
    dialect: 'postgres',
  },
  redis: {
    url: process.env.REDIS_URL,
  },
  auth: {
    session: {
      secret: process.env.AUTH_SESSION_SECRET,
      salt: process.env.AUTH_SALT || '',
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || '',
    ttl: 3600, // seconds
    tempToken: {
      ttl: 172800, //seconds
      secret: process.env.JWT_TEMP_TOKEN_SECRET || '',
    },
    refreshToken: {
      ttl: 604800, // seconds
      secret: process.env.JWT_REFRESH_TOKEN_SECRET || '',
    },
  },
};
