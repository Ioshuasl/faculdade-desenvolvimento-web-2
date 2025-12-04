import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { User } from '../database/models/User';
import MailService from '../services/MailService';

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

      if (!user) {
        // Por segurança, geralmente não avisamos se o email não existe, 
        // mas em dev pode retornar 404.
        return res.status(404).json({ error: 'Email não encontrado' });
      }

      // 1. Gerar token de recuperação (simples e seguro)
      const token = crypto.randomBytes(20).toString('hex');

      // 2. Definir expiração (ex: 1 hora)
      const now = new Date();
      now.setHours(now.getHours() + 1);

      // 3. Salvar token e expiração no usuário
      // (Certifique-se que seu Model User tenha esses campos ou crie uma tabela separada)
      await user.update({
        recoverPasswordToken: token,
        recoverPasswordExpires: now,
      });

      // 4. Montar o link de recuperação (apontando para seu Front-end)
      // Ex: http://localhost:3000/reset-password/TOKEN_AQUI
      const resetLink = `http://localhost:3000/reset-password/${token}`;

      // 5. Enviar o email
      await MailService.sendMail({
        to: email,
        subject: 'Recuperação de Senha - Sistema Restaurante',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Olá, ${user.name}!</h2>
            <p>Você solicitou a recuperação de sua senha.</p>
            <p>Clique no botão abaixo para criar uma nova senha:</p>
            <a href="${resetLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Redefinir Senha</a>
            <p>Se você não solicitou isso, ignore este email.</p>
            <p><small>Este link expira em 1 hora.</small></p>
          </div>
        `,
      });

      return res.json({ message: 'Email de recuperação enviado com sucesso!' });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao processar recuperação de senha' });
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