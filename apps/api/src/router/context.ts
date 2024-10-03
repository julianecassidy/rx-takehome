import 'dotenv/config';
import * as trpcExpress from '@trpc/server/adapters/express';
import jwt from 'jsonwebtoken';

export async function createContext({ req, res }: trpcExpress.CreateExpressContextOptions) {
  const token = req.headers.authorization?.split(' ')[1];

  let user = null;
  if (token) {
    try {
      user = jwt.verify(token, process.env.SECRET_KEY as string);
    } catch (error) {
      console.error('Invalid token:', error);
    }
  }

  return {
    user,  // user information if authenticated
    req,
    res,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;