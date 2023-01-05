import sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

import User from '~/db/sequelize/models/User';
import { HttpError } from '~/lib/errors';
import { passwordRegex } from '~/lib/accounts';

export default class UserService {
  user: User;
  private readonly saltRounds = 12;

  async init(id: number): Promise<void> {
    this.user = await User.findByPk(id);
  }

  async register(registrationData: User): Promise<User> {
    const existingUser: User = await User.findOne({
      where: sequelize.where(
        sequelize.fn('lower', sequelize.col('User.email')),
        registrationData.email.toLowerCase()
      ),
    });

    if (existingUser) {
      throw new HttpError('A user with this email address already exists!', 409);
    }

    if (!registrationData.password.match(passwordRegex)) {
      throw new HttpError('The password does not match the schema!', 400);
    }

    const hash = await bcrypt.hash(registrationData.password, this.saltRounds);

    this.user = await User.create({
      ...registrationData,
      password: hash,
    });

    return this.user;
  }

  async login(email: string, password: string): Promise<User> {
    this.user = await User.findOne({ where: { email } });
    const passwordIsValid = await this.validatePassword(password);

    if (!this.user || !passwordIsValid) {
      throw new HttpError('Invalid email or password!', 401);
    }

    return this.user;
  }

  private async validatePassword(password: string): Promise<boolean> {
    if (!this.user) {
      return false;
    }

    const isValid = await bcrypt.compare(password, this.user.password);
    return isValid;
  }
}
