import { z } from 'zod';

export const authSchema = {
  signup: z.object({
    body: z.object({
      name: z.string().min(1, 'Nome é obrigatório'),
      email: z.string().email('Email inválido'),
      password: z.string().min(6, 'Senha deve ter ao menos 6 caracteres'),
    }),
  }),

  signin: z.object({
    body: z.object({
      email: z.string().email('Email inválido'),
      password: z.string().min(1, 'Senha é obrigatória'),
    }),
  }),
};