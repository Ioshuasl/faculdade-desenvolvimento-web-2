import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../database/models/User';

const JWT_SECRET = String(process.env.JWT_SECRET);

export class AuthController {
  
  // SIGNUP
  async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const exists = await User.findOne({ where: { email } });
      if (exists) return res.status(400).json({ error: "Email já cadastrado" });

      const hash = await bcrypt.hash(password, 10);

      const user = await User.create({ name, email, password: hash });
      
      return res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email
      });
    } catch (err) {
      return res.status(500).json({ error: "Erro interno ao criar usuário" });
    }
  }

  // SIGNIN
  async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: "Senha incorreta" });

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } as jwt.SignOptions
      );

      return res.json({ token });
    } catch (err) {
      return res.status(500).json({ error: "Erro interno ao fazer login" });
    }
  }

  // ESQUECI A SENHA
  async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(404).json({ error: "Email não encontrado" });

      const token = crypto.randomBytes(20).toString("hex");
      const now = new Date();
      now.setHours(now.getHours() + 1); // 1 hora de validade

      user.recoverPassword = token;
      user.resetExpires = now;
      await user.save();

      // Aqui você enviaria o email na vida real
      return res.json({ message: "Token gerado", token });

    } catch (err) {
      return res.status(500).json({ error: "Erro ao gerar token" });
    }
  }

  // RESETAR SENHA
  async resetPassword(req: Request, res: Response) {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const user = await User.findOne({ where: { recoverPassword: token } });

      if (!user) return res.status(400).json({ error: "Token inválido" });
      
      if (user.resetExpires && user.resetExpires < new Date()) {
        return res.status(400).json({ error: "Token expirado" });
      }

      const hash = await bcrypt.hash(password, 10);

      user.password = hash;
      user.recoverPassword = null;
      user.resetExpires = null;
      await user.save();

      return res.json({ message: "Senha alterada com sucesso" });

    } catch (err) {
      return res.status(500).json({ error: "Erro ao redefinir senha" });
    }
  }
}