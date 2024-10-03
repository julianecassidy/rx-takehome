import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { prisma } from '../prismaClient';
import { publicProcedure, router } from '@api/trpc';
import { TRPCError } from '@trpc/server';

const defaultMedicationSelect = {
  id: true,
  name: true,
  details: true,
  warnings: true,
  cost: true,
  rxs: true,
} satisfies Prisma.MedicationSelect;

export const medicationRouter = router({
  list: publicProcedure
    .input(
      z.object({
        search: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const { search } = input;

      if (!search) {
        const medications = await prisma.medication.findMany();
        return medications;
      } else {
        const medications = await prisma.medication.findMany({
          where: {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
        });

        return medications;
      }
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ input }) => {
      const { id } = input;

      const medication = await prisma.medication.findUnique({
        where: { id },
        select: defaultMedicationSelect,
      });

      if (!medication) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No medication with id ${id}`,
        });
      }

      return medication;
    }),
});
