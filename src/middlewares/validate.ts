import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodObject) => 
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          error: 'Erro de validação',
          messages: error.issues.map((issue) => `${issue.path.join('.')} : ${issue.message}`),
        });
      }
      return res.status(500).json({ error: 'Erro interno de validação' });
    }
  };