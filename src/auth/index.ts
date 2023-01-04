import config from 'config';
import fastifyPassport from '@fastify/passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import UserService from '~/services/UserService';

import { JwtPayload } from './interfaces';

const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get<string>('jwt.secret'),
};

const jwtRefreshConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get<string>('jwt.refreshToken.secret'),
};

const jwtTempConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get<string>('jwt.tempToken.secret'),
};

export const setupPassport = () => {
  fastifyPassport.use('jwt', new JwtStrategy(jwtConfig, async (jwtPayload: JwtPayload, done: Function): Promise<void> => {
    try {
      const user = await UserService.userTokenIsValid(jwtPayload);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }
    catch (error) {
      done(error);
    }
  }));

  fastifyPassport.use('jwt-refresh-token', new JwtStrategy(jwtRefreshConfig, async (jwtPayload: JwtPayload, done: Function): Promise<void> => {
    try {
      const user = await UserService.userTokenIsValid(jwtPayload, 'refresh');

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }
    catch (error) {
      done(error);
    }
  }));

  fastifyPassport.use('jwt-temp-token', new JwtStrategy(jwtTempConfig, async (jwtPayload: JwtPayload, done: Function): Promise<void> => {
    try {
      const user = await UserService.userTokenIsValid(jwtPayload, 'temp');

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }
    catch (error) {
      done(error);
    }
  }));
};
