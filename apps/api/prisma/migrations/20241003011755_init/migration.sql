/*
  Warnings:

  - You are about to alter the column `cost` on the `Medication` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Medication" ALTER COLUMN "cost" SET DATA TYPE INTEGER;
