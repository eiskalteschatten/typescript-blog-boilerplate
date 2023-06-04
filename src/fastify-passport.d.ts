import User from './db/models/User';

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PassportUser extends User {}
}
