import { z } from 'zod';

export const productCategorySchema = {
  store: z.object({
    body: z.object({ name: z.string().min(2) }),
  }),
  update: z.object({
    params: z.object({ id: z.string().regex(/^\d+$/) }),
    body: z.object({ name: z.string().min(2).optional() }),
  }),
  byId: z.object({
    params: z.object({ id: z.string().regex(/^\d+$/) }),
  }),
};