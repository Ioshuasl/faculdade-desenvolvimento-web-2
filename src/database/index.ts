import { Sequelize } from 'sequelize';
import { User } from './models/User';
import { Situation } from './models/Situation';
import { Category } from './models/Category';
import { Occurrence } from './models/Occurrence';
import { Product } from './models/Product';
import { ProductCategory } from './models/ProductCategory';
import { ProductSituation } from './models/ProductSituation';

// Configuração da conexão
const dbConfig = {
  url: process.env.DATABASE_URL as string,
  options: {
    dialect: 'postgres' as const,
    define: {
      timestamps: true,
      underscored: false, // Mantivemos camelCase no banco
    },
    logging: false, // Desabilita logs de SQL no terminal (opcional)
  }
};

// Instância do Sequelize
const sequelize = new Sequelize(dbConfig.url, dbConfig.options);

// Lista de Models para inicializar
const models = [
  User, 
  Situation, 
  Category, 
  Occurrence, 
  Product, 
  ProductCategory, 
  ProductSituation
];

// 1. Inicializar Models
models.forEach((model) => model.initModel(sequelize));

// 2. Fazer Associações (se existirem)
models.forEach((model) => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

export default sequelize;