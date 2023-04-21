/*
  Warnings:

  - Added the required column `status` to the `PaidRent` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('FULLY_PAID', 'NOTHING_PAID', 'PARTIALLY_PAID', 'OVERPAID');

-- AlterTable
ALTER TABLE "PaidRent" ADD COLUMN     "status" "PaymentStatus" NOT NULL;
