import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

interface MailInterface {
  to: string;
  subject: string;
  html: string;
}

class MailService {
  private transporter;

  constructor() {
    // Configuração do transporter com Mailtrap
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async sendMail({ to, subject, html }: MailInterface): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: `"Api Trabalho Dev Web 2" <${process.env.FROM_EMAIL}>`, // Remetente
        to, // Destinatário
        subject, // Assunto
        html, // Corpo do email em HTML
      });

      console.log('Message sent: %s', info.messageId);
    } catch (error) {
      console.error('Error sending email: ', error);
      throw new Error('Falha ao enviar email');
    }
  }
}

export default new MailService();