import * as trpcExpress from '@trpc/server/adapters/express';
import cors from 'cors';
import 'dotenv/config';
import express from 'express';
import { appRouter } from '@api/router';
import { createContext } from './router/context';


async function main() {
  const port = process.env.PORT || 3000;
  const app = express();

  app.use(cors());

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
      // onError:
      //   process.env.NODE_ENV === 'development'
      //     ? ({ path, error }) => {
      //       console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
      //     }
      //     : undefined,
    })
  );


  // For testing purposes, wait-on requests '/'
  app.get('/', (req, res) => res.send('Server is running!'));

  app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
}

void main();
