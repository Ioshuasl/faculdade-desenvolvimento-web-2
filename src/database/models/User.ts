import { Model, DataTypes, Sequelize } from 'sequelize';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public recoverPassword?: string | null; // Pode ser nulo
  public resetExpires?: Date | null;
  public situationId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    User.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      recoverPassword: DataTypes.STRING,
      resetExpires: DataTypes.DATE,
      situationId: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Users',
      modelName: 'User'
    });
    return User;
  }

  static associate(models: any) {
    User.belongsTo(models.Situation, { foreignKey: 'situationId', as: 'situation' });
  }
}