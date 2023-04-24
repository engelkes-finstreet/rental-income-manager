/*
  Warnings:

  - You are about to drop the column `renterId` on the `PaidRent` table. All the data in the column will be lost.
  - You are about to drop the column `renterId` on the `RentContract` table. All the data in the column will be lost.
  - You are about to drop the column `buildingId` on the `Renter` table. All the data in the column will be lost.
  - You are about to drop the column `iban` on the `Renter` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[renterGroupId]` on the table `RentContract` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `renterGroupId` to the `Renter` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PaidRent" DROP CONSTRAINT "PaidRent_renterId_fkey";

-- DropForeignKey
ALTER TABLE "RentContract" DROP CONSTRAINT "RentContract_renterId_fkey";

-- DropForeignKey
ALTER TABLE "Renter" DROP CONSTRAINT "Renter_buildingId_fkey";

-- DropIndex
DROP INDEX "RentContract_renterId_key";

-- AlterTable
ALTER TABLE "PaidRent" DROP COLUMN "renterId",
ADD COLUMN     "renterGroupId" INTEGER;

-- AlterTable
ALTER TABLE "RentContract" DROP COLUMN "renterId",
ADD COLUMN     "renterGroupId" INTEGER;

-- AlterTable
ALTER TABLE "Renter" DROP COLUMN "buildingId",
DROP COLUMN "iban",
ADD COLUMN     "renterGroupId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "RenterGroup" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "iban" TEXT NOT NULL,
    "buildingId" INTEGER NOT NULL,

    CONSTRAINT "RenterGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RentContract_renterGroupId_key" ON "RentContract"("renterGroupId");

-- AddForeignKey
ALTER TABLE "RenterGroup" ADD CONSTRAINT "RenterGroup_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Renter" ADD CONSTRAINT "Renter_renterGroupId_fkey" FOREIGN KEY ("renterGroupId") REFERENCES "RenterGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RentContract" ADD CONSTRAINT "RentContract_renterGroupId_fkey" FOREIGN KEY ("renterGroupId") REFERENCES "RenterGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaidRent" ADD CONSTRAINT "PaidRent_renterGroupId_fkey" FOREIGN KEY ("renterGroupId") REFERENCES "RenterGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
