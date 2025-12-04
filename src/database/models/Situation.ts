import { Model, DataTypes, Sequelize } from 'sequelize';

export class Situation extends Model {
  public id!: number;
  public nameSituation!: string; // Atenção ao nome do campo que você usava

  // Método estático para inicializar o model
  static initModel(sequelize: Sequelize) {
    Situation.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nameSituation: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'Situations',
      modelName: 'Situation'
    });
    
    return Situation;
  }

  static associate(models: any) {
    // Definimos as associações aqui
    Situation.hasMany(models.User, { foreignKey: 'situationId', as: 'users' });
  }
}