/*
  Warnings:

  - Added the required column `iban` to the `Renter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Renter" ADD COLUMN     "iban" TEXT NOT NULL;
