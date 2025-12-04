import { Request, Response } from 'express';
import { ProductSituation } from '../database/models/ProductSituation';

export class ProductSituationController {
  
  async index(req: Request, res: Response) {
    try {
      const list = await ProductSituation.findAll({
        order: [['id', 'DESC']]
      });
      return res.json(list);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar situações de produto' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const situation = await ProductSituation.findByPk(id);
      
      if (!situation) {
        return res.status(404).json({ error: 'Situação de produto não encontrada' });
      }
      return res.json(situation);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar situação' });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const created = await ProductSituation.create({ name });
      return res.status(201).json(created);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar situação de produto' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const situation = await ProductSituation.findByPk(id);

      if (!situation) return res.status(404).json({ error: 'Situação de produto não encontrada' });

      const { name } = req.body;
      if (name) situation.name = name;
      
      await situation.save();

      return res.json(situation);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar situação de produto' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const situation = await ProductSituation.findByPk(id);
      
      if (!situation) return res.status(404).json({ error: 'Situação de produto não encontrada' });

      await situation.destroy();
      return res.json({ message: 'Situação removida com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao remover situação de produto' });
    }
  }
}