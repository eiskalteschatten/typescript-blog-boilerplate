import sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

import User, { UserRoles } from '~/db/sequelize/models/User';
import { HttpError } from '~/lib/errors';
import { passwordRegex } from '~/lib/accounts';

interface RegistrationData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role: UserRoles;
}

export default class UserService {
  user: User;
  private readonly saltRounds = 12;

  async init(id: number): Promise<void> {
    this.user = await User.findByPk(id);
  }

  async register(registrationData: RegistrationData): Promise<User> {
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

  async login(email: string, password: string, isAdmin = false): Promise<User> {
    this.user = await User.findOne({ where: { email } });
    const passwordIsValid = await this.validatePassword(password);

    if (
      !this.user ||
      !passwordIsValid ||
      (isAdmin && ![UserRoles.SuperAdmin].includes(this.user.role))
    ) {
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

  async createDefaultUser(): Promise<void> {
    const defaultUser: RegistrationData = {
      email: process.env.DEFAULT_USER_EMAIL,
      firstName: process.env.DEFAULT_USER_FIRST_NAME,
      lastName: process.env.DEFAULT_USER_LAST_NAME,
      password:  process.env.DEFAULT_USER_PASSWORD,
      role: UserRoles.SuperAdmin,
    };

    Object.values(defaultUser).forEach(value => {
      if (!value) {
        throw new Error('You need to define the default user data using env variables! See createDefaultUser() in the UserService.');
      }
    });

    await this.register(defaultUser);
  }
}
