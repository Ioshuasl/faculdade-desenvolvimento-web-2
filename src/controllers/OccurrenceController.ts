import { Request, Response } from 'express';
import { Occurrence } from '../database/models/Occurrence';
import { User } from '../database/models/User';
import { Category } from '../database/models/Category';

export class OccurrenceController {

  async index(req: Request, res: Response) {
    try {
      const occurrences = await Occurrence.findAll({
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
          { model: Category, as: 'category' }
        ],
        order: [['createdAt', 'DESC']]
      });
      return res.json(occurrences);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar ocorrências' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const occurrence = await Occurrence.findByPk(id, {
        include: [
          { model: User, as: 'user', attributes: ['id', 'name', 'email'] },
          { model: Category, as: 'category' }
        ]
      });

      if (!occurrence) return res.status(404).json({ error: 'Ocorrência não encontrada' });
      return res.json(occurrence);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar ocorrência' });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { title, description, categoryId, productId } = req.body;
      const userId = req.userId; // Vem do Middleware de Auth (Tipagem customizada)

      if (!userId) return res.status(401).json({ error: 'Usuário não autenticado' });

      const occurrence = await Occurrence.create({
        title,
        description,
        categoryId,
        userId,
        productId: productId || null
      });

      return res.status(201).json(occurrence);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar ocorrência' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const occurrence = await Occurrence.findByPk(id);
      if (!occurrence) return res.status(404).json({ error: 'Ocorrência não encontrada' });

      const { title, description, categoryId, productId } = req.body;

      if (title) occurrence.title = title;
      if (description) occurrence.description = description;
      if (categoryId) occurrence.categoryId = categoryId;
      if (productId) occurrence.productId = productId;

      await occurrence.save();
      return res.json(occurrence);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar ocorrência' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const occurrence = await Occurrence.findByPk(id);
      if (!occurrence) return res.status(404).json({ error: 'Ocorrência não encontrada' });

      await occurrence.destroy();
      return res.json({ message: 'Ocorrência removida com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao remover ocorrência' });
    }
  }
}