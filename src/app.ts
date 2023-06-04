import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import formBody from '@fastify/formbody';
import helmet from '@fastify/helmet';
import { fastifyAutoload } from '@fastify/autoload';
import fastifyCookie from '@fastify/cookie';
import fastifyPassport from '@fastify/passport';
import fastifySession from '@fastify/session';
import fastifyCsrfProtection from '@fastify/csrf-protection';
import sequelizeStore from 'connect-session-sequelize';
import ejs from 'ejs';
import path from 'path';
import config from 'config';

import sequelize from './db';

const port = Number(process.env.PORT) || 4000;

const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
  ignoreTrailingSlash: true,
});

app.register(formBody);

app.register(fastifyView, {
  engine: { ejs },
  root: './templates/auth',
  layout: '_layout.ejs',
  propertyName: 'auth',
});

app.register(fastifyView, {
  engine: { ejs },
  root: './templates/blog',
  layout: '_layout.ejs',
  propertyName: 'blog',
});

app.register(fastifyView, {
  engine: { ejs },
  root: './templates/admin',
  layout: '_layout.ejs',
  propertyName: 'admin',
});

app.register(helmet, { global: true });

app.register(fastifyAutoload, {
  dir: path.join(__dirname, 'routes'),
});

// Necessary for @fastify/session
app.register(fastifyCookie);

const SequelizeStore = sequelizeStore(fastifySession.Store);

app.register(fastifySession, {
  secret: config.get<string>('auth.session.secret'),
  store: new SequelizeStore({
    db: sequelize,
  }),
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

app.register(fastifyCsrfProtection, {
  sessionPlugin: '@fastify/session',
});

const host = process.env.RUNNING_IN_DOCKER === 'true' ? '0.0.0.0' : undefined;

app.listen({ port, host }, error => {
  if (error) {
    throw error;
  }
});

export default app;
