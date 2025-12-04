import { Request, Response } from 'express';
import { Category } from '../database/models/Category';

export class CategoryController {
  
  async index(req: Request, res: Response) {
    try {
      const categories = await Category.findAll();
      return res.json(categories);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao listar categorias" });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) return res.status(404).json({ error: "Categoria não encontrada" });
      return res.json(category);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao buscar categoria" });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const category = await Category.create({ name });
      return res.status(201).json(category);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao criar categoria" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) return res.status(404).json({ error: "Categoria não encontrada" });

      const { name } = req.body;
      if (name) category.name = name;
      
      await category.save();
      return res.json(category);
    } catch (err) {
      return res.status(500).json({ error: "Erro ao atualizar categoria" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) return res.status(404).json({ error: "Categoria não encontrada" });

      await category.destroy();
      return res.json({ message: "Categoria removida com sucesso" });
    } catch (err) {
      return res.status(500).json({ error: "Erro ao deletar categoria" });
    }
  }
}