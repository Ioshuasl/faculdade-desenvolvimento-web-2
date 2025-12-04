import { Model, DataTypes, Sequelize } from 'sequelize';

export class Category extends Model {
  public id!: string; // UUID é string no JS
  public name!: string;

  static initModel(sequelize: Sequelize) {
    Category.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'Categories',
      modelName: 'Category'
    });
    return Category;
  }

  static associate(models: any) {
    Category.hasMany(models.Occurrence, { foreignKey: 'categoryId', as: 'occurrences' });
  }
}