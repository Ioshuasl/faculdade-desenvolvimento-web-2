import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      userId?: number; // ou string, dependendo se usar UUID ou Integer no Token
    }
  }
}