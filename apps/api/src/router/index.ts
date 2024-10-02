import { router } from '@api/trpc';
import { userRouter } from '@api/router/user';
import { medicationRouter } from './medication';

export const appRouter = router({
  user: userRouter,
  medication: medicationRouter,
});

export type AppRouter = typeof appRouter;
