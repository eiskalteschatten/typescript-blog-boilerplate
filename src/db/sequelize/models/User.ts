import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize';

import sequelize from '~/db/sequelize';

export default class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare firstName: string;
  declare lastName: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
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
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'users',
  }
);
