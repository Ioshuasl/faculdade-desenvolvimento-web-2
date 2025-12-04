import { z } from 'zod';

export const occurrenceSchema = {
  store: z.object({
    body: z.object({
      title: z.string().min(3, 'Título muito curto'),
      description: z.string().min(5, 'Descrição muito curta'),
      categoryId: z.string().uuid('Categoria inválida'), // UUID
      productId: z.number().int().optional().nullable(), // Int
      // userId não validamos aqui, pois vem do Token
    }),
  }),

  update: z.object({
    params: z.object({
      id: z.string().uuid('ID da ocorrência inválido'),
    }),
    body: z.object({
      title: z.string().min(3).optional(),
      description: z.string().min(5).optional(),
      categoryId: z.string().uuid().optional(),
      productId: z.number().int().optional(),
    }),
  }),

  byId: z.object({
    params: z.object({
      id: z.string().uuid('ID inválido'),
    }),
  }),
};