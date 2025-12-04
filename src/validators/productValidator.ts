import { z } from 'zod';

export const productSchema = {
  store: z.object({
    body: z.object({
      name: z.string().min(2, 'Nome obrigatório'),
      description: z.string().optional(),
      price: z.number().min(0, 'Preço deve ser positivo').optional(),
      stock: z.number().int().min(0).optional(),
      categoryId: z.number().int('Categoria deve ser um ID numérico'),
      situationId: z.number().int('Situação deve ser um ID numérico'),
    }),
  }),

  update: z.object({
    params: z.object({
      id: z.string().regex(/^\d+$/, 'ID inválido'),
    }),
    body: z.object({
      name: z.string().min(2).optional(),
      description: z.string().optional(),
      price: z.number().min(0).optional(),
      categoryId: z.number().int().optional(),
      situationId: z.number().int().optional(),
    }),
  }),

  byId: z.object({
    params: z.object({
      id: z.string().regex(/^\d+$/, 'ID inválido'),
    }),
  }),
  
  // Exemplo de validação de Query Params para paginação
  pagination: z.object({
    query: z.object({
      page: z.string().regex(/^\d+$/).optional(),
      limit: z.string().regex(/^\d+$/).optional(),
    }),
  }),
};