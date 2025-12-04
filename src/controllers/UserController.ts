import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from '../database/models/User';
import { Situation } from '../database/models/Situation';

export class UserController {
  
  async index(req: Request, res: Response) {
    try {
      const users = await User.findAll({
        include: [{ model: Situation, as: 'situation' }],
        attributes: { exclude: ['password', 'recoverPassword'] }
      });
      return res.json(users);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao listar usuários' });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        include: [{ model: Situation, as: 'situation' }],
        attributes: { exclude: ['password', 'recoverPassword'] }
      });

      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      return res.json(user);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password, situationId } = req.body;

      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      if (email && email !== user.email) {
        const exists = await User.findOne({ where: { email } });
        if (exists) return res.status(400).json({ error: 'Email já em uso' });
        user.email = email;
      }

      if (name) user.name = name;
      if (situationId) user.situationId = situationId;
      if (password) user.password = await bcrypt.hash(password, 10);

      await user.save();

      // Remove senha do retorno
      const userResponse = user.toJSON();
      delete (userResponse as any).password;
      delete (userResponse as any).recoverPassword;

      return res.json(userResponse);
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

      await user.destroy();
      return res.json({ message: 'Usuário removido com sucesso' });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao remover usuário' });
    }
  }
}