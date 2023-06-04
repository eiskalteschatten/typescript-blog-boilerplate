require('dotenv').config();

module.exports = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: process.env.DB_SSL === 'true',
    dialect: 'mariadb',
  },
  auth: {
    session: {
      secret: process.env.AUTH_SESSION_SECRET || 'this is a long string of 32 characters or more that must be changed',
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
