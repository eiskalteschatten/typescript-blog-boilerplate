import { QueryInterface, DataTypes as DataTypesNamespace } from 'sequelize';

enum UserRoles {
  SuperAdmin = 'superAdmin',
  Subscriber = 'subscriber',
}

export default {
  up: async (query: QueryInterface, DataTypes: typeof DataTypesNamespace): Promise<void> => {
    try {
      const tableDesc = await query.describeTable('users');
      if (tableDesc['id']) return Promise.resolve();
    }
    catch (error) {
      // Silently fail because the table most likely doesn't exist and will be
      // created later
    }

    return query.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
      },
      email: {
        type: new DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      firstName: {
        type: new DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: new DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: new DataTypes.ENUM(...Object.values(UserRoles)),
        allowNull: false,
        defaultValue: UserRoles.Subscriber,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    });
  },

  down: async (query: QueryInterface): Promise<void> => {
    return query.dropTable('users');
  },
};
