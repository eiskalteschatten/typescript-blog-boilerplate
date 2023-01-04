import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import helmet from '@fastify/helmet';
import { fastifyAutoload } from '@fastify/autoload';
import fastifyPassport from '@fastify/passport';
import fastifySecureSession from '@fastify/secure-session';
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
  ...process.env.NODE_ENV !== 'development' && {
    http2: true,
  },
});

app.register(helmet, { global: true });

app.register(fastifyAutoload, {
  dir: path.join(__dirname, 'routes'),
});

app.register(fastifySecureSession, {
  secret: config.get<string>('auth.session.secret'),
  salt: config.get<string>('auth.session.salt'),
});
app.register(fastifyPassport.initialize());
app.register(fastifyPassport.secureSession());

if (process.env.NODE_ENV !== 'development') {
  // Serve the built React client

  // TODO!
  // app.register(fastifyStatic, {
  //   root: clientRoot,
  // });

  // Explicitly set the not found handler to send the React app
  // so that the React routing works
  app.setNotFoundHandler((req, res) => {
    res.sendFile('index.html');
  });
}

const host = process.env.RUNNING_IN_DOCKER === 'true' ? '0.0.0.0' : undefined;

app.listen({ port, host }, error => {
  if (error) {
    throw error;
  }
});

export default app;
