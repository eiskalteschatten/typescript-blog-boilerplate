import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import helmet from '@fastify/helmet';
import { fastifyAutoload } from '@fastify/autoload';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import fastifyPassport from '@fastify/passport';
import ejs from 'ejs';
import path from 'path';
import config from 'config';

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

app.register(fastifyCookie);
app.register(fastifySession, { secret: config.get<string>('auth.session.secret') });
app.register(fastifyPassport.initialize());
app.register(fastifyPassport.secureSession());

app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'public'),
});

// TODO!
// Explicitly set the not found handler to send the React app
// so that the React routing works
// app.setNotFoundHandler((req, res) => {
//   res.sendFile('index.html');
// });

const host = process.env.RUNNING_IN_DOCKER === 'true' ? '0.0.0.0' : undefined;

app.listen({ port, host }, error => {
  if (error) {
    throw error;
  }
});

export default app;
