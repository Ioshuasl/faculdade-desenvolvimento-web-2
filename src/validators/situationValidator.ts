import { z } from 'zod';

export const situationSchema = {
  store: z.object({
    body: z.object({
      nameSituation: z.string().min(2, 'Nome obrigatório'),
    }),
  }),
  update: z.object({
    params: z.object({ id: z.string().regex(/^\d+$/) }),
    body: z.object({ nameSituation: z.string().min(2).optional() }),
  }),
  byId: z.object({
    params: z.object({ id: z.string().regex(/^\d+$/) }),
  }),
};