import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import helmet from '@fastify/helmet';
import { fastifyAutoload } from '@fastify/autoload';
import fastifyCookie from '@fastify/cookie';
import fastifyPassport from '@fastify/passport';
import fastifySession from '@fastify/session';
import RedisStore from 'connect-redis';
import ejs from 'ejs';
import path from 'path';
import config from 'config';

import redisClient from './db/redis';
import UserService from './services/UserService';

const port = Number(process.env.PORT) || 4000;

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
  ignoreTrailingSlash: true,
});

app.register(fastifyView, {
  engine: { ejs },
  root: './templates/blog',
  layout: 'layout.ejs',
  propertyName: 'blog',
});

app.register(fastifyView, {
  engine: { ejs },
  root: './templates/admin',
  layout: 'layout.ejs',
  propertyName: 'admin',
});

app.register(helmet, { global: true });

app.register(fastifyAutoload, {
  dir: path.join(__dirname, 'routes'),
});

// Necessary for @fastify/session
app.register(fastifyCookie);

app.register(fastifySession, {
  secret: config.get<string>('auth.session.secret'),
  store: new RedisStore({
    client: redisClient,
  }) as any,  // Use 'any' here as per the documentation: https://github.com/fastify/session#typescript-support
  saveUninitialized: false,
});

app.register(fastifyPassport.initialize());
app.register(fastifyPassport.secureSession());

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'public'),
});

// TODO!
// app.setNotFoundHandler((req, res) => {
//   res.sendFile('index.html');
// });

const host = process.env.RUNNING_IN_DOCKER === 'true' ? '0.0.0.0' : undefined;

app.listen({ port, host }, error => {
  if (error) {
    throw error;
  }
});

if (process.env.CREATE_DEFAULT_USER) {
  const userService = new UserService();
  userService.createDefaultUser();
}

export default app;
