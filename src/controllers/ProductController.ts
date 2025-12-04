import { Request, Response } from 'express';
import { Product } from '../database/models/Product';
import { ProductCategory } from '../database/models/ProductCategory';
import { ProductSituation } from '../database/models/ProductSituation';

export class ProductController {
  
  async index(req: Request, res: Response) {
    try {
      // Tipando a query string para paginação
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Product.findAndCountAll({
        limit,
        offset,
        include: [
          { model: ProductCategory, as: 'category' },
          { model: ProductSituation, as: 'situation' }
        ],
        order: [['id', 'DESC']]
      });

      return res.json({
        data: rows,
        meta: {
          totalItems: count,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          perPage: limit
        }
      });

    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar produtos' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id, {
        include: [
          { model: ProductCategory, as: 'category' },
          { model: ProductSituation, as: 'situation' }
        ]
      });

      if (!product) return res.status(404).json({ error: 'Produto não encontrado' });
      return res.json(product);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name, categoryId, situationId, price, stock, description } = req.body;

      const product = await Product.create({
        name,
        description,
        price: price || 0,
        stock: stock || 0,
        productCategoryId: categoryId,
        productSituationId: situationId
      });

      return res.status(201).json(product);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar produto' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

      const { name, categoryId, situationId, price, stock, description } = req.body;

      if (name) product.name = name;
      if (description) product.description = description;
      if (price !== undefined) product.price = price;
      if (stock !== undefined) product.stock = stock;
      if (categoryId) product.productCategoryId = categoryId;
      if (situationId) product.productSituationId = situationId;

      await product.save();
      return res.json(product);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);
      if (!product) return res.status(404).json({ error: 'Produto não encontrado' });

      await product.destroy();
      return res.json({ message: 'Produto removido com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao remover produto' });
    }
  }
}