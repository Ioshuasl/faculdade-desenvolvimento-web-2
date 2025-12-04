import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Interface para o payload do token (o que guardamos dentro dele)
interface TokenPayload {
  id: number;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token não enviado' });
  }

  const [, token] = authorization.split(' ');

  try {
    // Decodifica e valida o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    
    // Força o tipo para TokenPayload para o TS entender que tem um .id
    const { id } = decoded as TokenPayload;

    // Grava o ID na requisição para ser usado nos controllers
    req.userId = id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}