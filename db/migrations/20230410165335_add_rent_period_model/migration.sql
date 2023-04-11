/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PaidRent` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `PaidRent` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `PaidRent` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `PaidRent` table. All the data in the column will be lost.
  - Added the required column `rentPeriodId` to the `PaidRent` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PaidRent_renterId_year_month_key";

-- AlterTable
ALTER TABLE "PaidRent" DROP COLUMN "createdAt",
DROP COLUMN "month",
DROP COLUMN "updatedAt",
DROP COLUMN "year",
ADD COLUMN     "rentPeriodId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "RentPeriod" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,

    CONSTRAINT "RentPeriod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RentPeriod_year_month_key" ON "RentPeriod"("year", "month");

-- AddForeignKey
ALTER TABLE "PaidRent" ADD CONSTRAINT "PaidRent_rentPeriodId_fkey" FOREIGN KEY ("rentPeriodId") REFERENCES "RentPeriod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
