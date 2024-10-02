import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { prisma } from '../prismaClient';
import { publicProcedure, router } from '@api/trpc';
import { TRPCError } from '@trpc/server';

const defaultUserSelect = {
  id: true,
  email: true,
  name: true,
  rxs: true,
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

  get: publicProcedure
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

      if (!user) {
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
        email: z.string().min(5),
        name: z.string().min(1).max(100),
        password: z.string().min(3),
      }),
    )
    .mutation(async ({ input }) => {
      const user = await prisma.user.create({
        data: input,
        select: defaultUserSelect,
      });

      return user;
    }),

  prescribe: publicProcedure
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

  updateRx: publicProcedure
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

  unprescribe: publicProcedure
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
