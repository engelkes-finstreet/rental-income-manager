/*
  Warnings:

  - You are about to drop the `RentPayment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RentPayment" DROP CONSTRAINT "RentPayment_renterId_fkey";

-- DropTable
DROP TABLE "RentPayment";

-- CreateTable
CREATE TABLE "PaidRent" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "renterId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,

    CONSTRAINT "PaidRent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaidRent_renterId_year_month_key" ON "PaidRent"("renterId", "year", "month");

-- AddForeignKey
ALTER TABLE "PaidRent" ADD CONSTRAINT "PaidRent_renterId_fkey" FOREIGN KEY ("renterId") REFERENCES "Renter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
