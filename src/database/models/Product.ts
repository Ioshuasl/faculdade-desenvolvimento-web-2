import { Model, DataTypes, Sequelize } from 'sequelize';

export class Product extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public stock!: number;
  public productCategoryId!: number;
  public productSituationId!: number;

  static initModel(sequelize: Sequelize) {
    Product.init({
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      price: DataTypes.DECIMAL(10, 2),
      stock: DataTypes.INTEGER,
      productCategoryId: DataTypes.INTEGER,
      productSituationId: DataTypes.INTEGER
    }, {
      sequelize,
      tableName: 'Products',
      modelName: 'Product'
    });
    return Product;
  }

  static associate(models: any) {
    Product.belongsTo(models.ProductCategory, { foreignKey: 'productCategoryId', as: 'category' });
    Product.belongsTo(models.ProductSituation, { foreignKey: 'productSituationId', as: 'situation' });
  }
}