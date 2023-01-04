import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

import { fastifyPreValidationJwt, fastifyPreValidationRefreshToken } from '~/auth/fastify';
import { HttpError } from '~/lib/errors';
import UserService from '~/services/UserService';

export default async (app: FastifyInstance) => {
  type LoginRequest = FastifyRequest<{ 
    Body: { 
      email: string; 
      password: string;
    };
  }>;

  app.post('/login', async (req: LoginRequest, reply: FastifyReply) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new HttpError('Both email and password are required to log in!', 400);
    }

    const userService = new UserService();
    const loginReply = await userService.login(email, password);

    reply.send(loginReply);
  });

  app.post('/logout', fastifyPreValidationJwt, async (req: FastifyRequest, reply: FastifyReply) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new HttpError('No user could be found!', 500);
    }

    await UserService.logout(userId);
    reply.status(204).send();
  });

  app.post('/refresh-access-token', fastifyPreValidationRefreshToken, async (req: FastifyRequest, reply: FastifyReply) => {
    const userId = req.user?.id;

    if (!userId) {
      throw new HttpError('No user could be found!', 500);
    }

    const accessToken = await UserService.generateJwt(userId);
    reply.send({ accessToken });
  });
};
