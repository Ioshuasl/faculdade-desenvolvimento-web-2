import { z } from 'zod';

export const productSituationSchema = {
  // Validação para criar (POST)
  store: z.object({
    body: z.object({
      name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres'),
    }),
  }),

  // Validação para atualizar (PUT)
  update: z.object({
    params: z.object({
      id: z.string().regex(/^\d+$/, 'ID inválido'), // Garante que é número
    }),
    body: z.object({
      name: z.string().min(2, 'O nome deve ter pelo menos 2 caracteres').optional(),
    }),
  }),

  // Validação para buscar um ou deletar (GET /:id e DELETE /:id)
  byId: z.object({
    params: z.object({
      id: z.string().regex(/^\d+$/, 'ID inválido'),
    }),
  }),
};