import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';

import User from '~/db/sequelize/models/User';
import { HttpError } from '~/lib/errors';
import UserService from '~/services/UserService';

export default async (app: FastifyInstance) => {
  type RegistrationRequest = FastifyRequest<{ Body: { registrationData: User } }>;

  app.post('/register', async (req: RegistrationRequest, reply: FastifyReply) => {
    const registrationData = req.body?.registrationData;

    if (!registrationData) {
      throw new HttpError('No registration data was provided!', 400);
    }

    const userService = new UserService();
    const user = await userService.register(registrationData);

    const accessToken = await UserService.generateJwt(user.id);
    const refreshToken = await UserService.generateRefreshToken(user.id);

    reply.send({
      user: userService.serializeUser(),
      accessToken,
      refreshToken,
    });
  });
};
