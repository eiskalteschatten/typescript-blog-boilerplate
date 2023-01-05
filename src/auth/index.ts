import fastifyPassport from '@fastify/passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '~/db/sequelize/models/User';

// import UserService from '~/services/UserService';

export const setupPassport = () => {
  fastifyPassport.use('local', new LocalStrategy(async (username: string, password: string, done: Function): Promise<void> => {
    try {
      const user = {};//await UserService.userLogin(username, password);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }
    catch (error) {
      done(error);
    }
  }));

  fastifyPassport.registerUserSerializer(async (user: User) => user.id);

  fastifyPassport.registerUserDeserializer(async (id: number) => {
    // TODO
    return {}; //await User.findById(id);
  });
};
