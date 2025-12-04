import { z } from 'zod';

export const userSchema = {
  update: z.object({
    params: z.object({
      id: z.string().regex(/^\d+$/, 'ID deve ser um número'), // Recebido como string na URL
    }),
    body: z.object({
      name: z.string().min(2, 'Nome muito curto').optional(),
      email: z.string().email('Email inválido').optional(),
      password: z.string().min(6, 'Senha muito curta').optional(),
      situationId: z.number().int().optional(),
    }),
  }),

  showOrDelete: z.object({
    params: z.object({
      id: z.string().regex(/^\d+$/, 'ID deve ser um número'),
    }),
  }),
};