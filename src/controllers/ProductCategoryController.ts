import { Request, Response } from 'express';
import { ProductCategory } from '../database/models/ProductCategory';

export class ProductCategoryController {
  
  // LISTAR TODOS
  async index(req: Request, res: Response) {
    try {
      const list = await ProductCategory.findAll({
        order: [['id', 'DESC']]
      });
      return res.json(list);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar categorias de produto' });
    }
  }

  // EXIBIR UM
  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await ProductCategory.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: 'Categoria de produto não encontrada' });
      }
      return res.json(category);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar categoria' });
    }
  }

  // CRIAR
  async store(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const created = await ProductCategory.create({ name });
      return res.status(201).json(created);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar categoria de produto' });
    }
  }

  // ATUALIZAR
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await ProductCategory.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: 'Categoria de produto não encontrada' });
      }

      const { name } = req.body;
      if (name) category.name = name;
      
      await category.save();

      return res.json(category);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }

  // DELETAR
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await ProductCategory.findByPk(id);

      if (!category) {
        return res.status(404).json({ error: 'Categoria de produto não encontrada' });
      }

      await category.destroy();
      return res.json({ message: 'Categoria removida com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao remover categoria' });
    }
  }
}