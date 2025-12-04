import { Model, DataTypes, Sequelize } from 'sequelize';

export class ProductCategory extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    ProductCategory.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'ProductCategories', // Nome da tabela no banco
      modelName: 'ProductCategory'
    });

    return ProductCategory;
  }

  static associate(models: any) {
    // Uma Categoria tem muitos Produtos
    ProductCategory.hasMany(models.Product, { 
      foreignKey: 'productCategoryId', 
      as: 'products' 
    });
  }
}