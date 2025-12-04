import { z } from 'zod';

export const categorySchema = {
  store: z.object({
    body: z.object({
      name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
    }),
  }),

  update: z.object({
    params: z.object({
      id: z.string().uuid('ID inválido'),
    }),
    body: z.object({
      name: z.string().min(2).optional(),
    }),
  }),

  byId: z.object({
    params: z.object({
      id: z.string().uuid('ID inválido'),
    }),
  }),
};