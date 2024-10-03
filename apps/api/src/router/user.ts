import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { prisma } from '../prismaClient';
import { publicProcedure, router } from '@api/trpc';
import { TRPCError } from '@trpc/server';
import jwt from 'jsonwebtoken';
import { protectedProcedure } from './middleware';


const defaultUserSelect = {
  id: true,
  email: true,
  name: true,
  rxs: {
    include: {
      medication: true,
    }
  },
} satisfies Prisma.UserSelect;

const defaultRxSelect = {
  id: true,
  dosage: true,
  notes: true,
  medication: true,
  user: true,
} satisfies Prisma.RxSelect;

export const userRouter = router({
  list: publicProcedure
    .query(async () => {
      const users = await prisma.user.findMany();

      return users;
    }),

  get: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;

      const user = await prisma.user.findUnique({
        where: { id },
        select: defaultUserSelect,
      });

  if(!user) {
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: `No user with id ${id}`,
    });
  }

      return user;
}),

  create: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        name: z.string().min(1).max(100),
        password: z.string().min(3),
      }),
    )
      .mutation(async ({ input }) => {
        const user = await prisma.user.create({
          data: input,
          select: defaultUserSelect,
        });

        const token = jwt.sign(
          { id: user.id, name: user.name },
          process.env.SECRET_KEY as string,
          { expiresIn: '1h' },
        );
        return { token };
      }),

      login: publicProcedure
        .input(z.object({ email: z.string().email(), password: z.string() }))
        .mutation(async ({ input }) => {
          const { email, password } = input;

          const user = await prisma.user.findUnique({
            where: {
              email: email,
            },
          });

          if (!user) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
          }

          if (user.password === password) {
            const token = jwt.sign(
              { id: user.id, name: user.name },
              process.env.SECRET_KEY as string,
              { expiresIn: '1h' },
            );
            return { token };
          }

          throw new Error('Invalid credentials');
        }),

        getRxs: protectedProcedure
          .input(z.object({
            id: z.number(),
          }),
          )
          .query(async ({ input }) => {
            const { id } = input;

            const rxs = await prisma.user.findUnique({
              where: { id },
              select: { id: true, rxs: true },
            });

            if (!rxs) {
              throw new TRPCError({
                code: 'NOT_FOUND',
                message: `No user with id ${id}`,
              });
            }

            return { rxs };
          }),

          prescribe: protectedProcedure
            .input(
              z.object({
                userId: z.number(),
                medicationId: z.number(),
                dosage: z.string(),
                notes: z.string(),
              }),
            )
            .mutation(async ({ input }) => {
              const rx = await prisma.rx.create({
                data: input,
                select: defaultRxSelect,
              });

              return rx;
            }),

            updateRx: protectedProcedure
              .input(
                z.object({
                  id: z.number(),
                  dosage: z.string(),
                  notes: z.string(),
                }),
              )
              .mutation(async ({ input }) => {
                const { id, dosage, notes } = input;

                const rx = await prisma.rx.update({
                  where: { id },
                  data: { dosage, notes },
                  select: defaultRxSelect,
                });

                return rx;
              }),

              unprescribe: protectedProcedure
                .input(
                  z.object({
                    id: z.number(),
                  }),
                )
                .mutation(async ({ input }) => {
                  const { id } = input;

                  const rx = await prisma.rx.delete({
                    where: { id },
                    select: defaultRxSelect,
                  });

                  return rx;
                }),
});
