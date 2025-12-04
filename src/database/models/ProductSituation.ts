import { Model, DataTypes, Sequelize } from 'sequelize';

export class ProductSituation extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initModel(sequelize: Sequelize) {
    ProductSituation.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING
    }, {
      sequelize,
      tableName: 'ProductSituations', // Nome da tabela no banco
      modelName: 'ProductSituation'
    });

    return ProductSituation;
  }

  static associate(models: any) {
    // Uma Situação tem muitos Produtos
    ProductSituation.hasMany(models.Product, { 
      foreignKey: 'productSituationId', 
      as: 'products' 
    });
  }
}