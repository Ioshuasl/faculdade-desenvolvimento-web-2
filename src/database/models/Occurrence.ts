import { Model, DataTypes, Sequelize } from 'sequelize';

export class Occurrence extends Model {
  public id!: string;
  public title!: string;
  public description!: string;
  public categoryId!: string; // UUID
  public userId!: number;     // Integer
  public productId?: number | null; // Opcional

  static initModel(sequelize: Sequelize) {
    Occurrence.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      categoryId: DataTypes.UUID,
      userId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Occurrences',
      modelName: 'Occurrence'
    });
    return Occurrence;
  }

  static associate(models: any) {
    Occurrence.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
    Occurrence.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Occurrence.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  }
}