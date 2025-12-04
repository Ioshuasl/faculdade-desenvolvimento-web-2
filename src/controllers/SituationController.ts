import { Request, Response } from 'express';
import { Situation } from '../database/models/Situation';

export class SituationController {
  
  async index(req: Request, res: Response) {
    try {
      const situations = await Situation.findAll();
      return res.json(situations);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar situações' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const situation = await Situation.findByPk(id);
      if (!situation) return res.status(404).json({ error: 'Situação não encontrada' });
      return res.json(situation);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar situação' });
    }
  }

  async store(req: Request, res: Response) {
    try {
      const { nameSituation } = req.body;
      const situation = await Situation.create({ nameSituation });
      return res.status(201).json(situation);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao criar situação' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const situation = await Situation.findByPk(id);
      if (!situation) return res.status(404).json({ error: 'Situação não encontrada' });

      const { nameSituation } = req.body;
      if (nameSituation) situation.nameSituation = nameSituation;

      await situation.save();
      return res.json(situation);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar situação' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const situation = await Situation.findByPk(id);
      if (!situation) return res.status(404).json({ error: 'Situação não encontrada' });

      await situation.destroy();
      return res.json({ message: 'Situação removida com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao remover situação' });
    }
  }
}