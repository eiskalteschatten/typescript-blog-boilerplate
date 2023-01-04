import User from './db/sequelize/models/User';

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PassportUser extends User {}
}
