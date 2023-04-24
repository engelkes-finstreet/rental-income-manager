import db, { PaymentStatus, Prisma } from "./index"
import { SecurePassword } from "@blitzjs/auth/secure-password"

const seed = async () => {
  const hashedPassword = await SecurePassword.hash("Anmeldung1.")

  const user = await db.user.create({
    data: {
      email: "test@test.de",
      hashedPassword,
      role: "ADMIN",
    },
  })

  const building = await db.building.create({
    data: {
      city: "Münster",
      street: "Südstraße",
      number: 52,
      ownerId: user.id,
    },
  })

  const renterGroup1 = await db.renterGroup.create({
    data: {
      iban: "123456",
      buildingId: building.id,
    },
  })

  const renterGroup2 = await db.renterGroup.create({
    data: {
      iban: "12345",
      buildingId: building.id,
    },
  })

  const renter1 = await db.renter.create({
    data: {
      name: "Patrick Engelkes",
      email: "patrick.engelkes@gmail.com",
      renterGroupId: renterGroup1.id,
    },
  })

  const renter2 = await db.renter.create({
    data: {
      name: "Carolin Siebeneck",
      email: "c.siebeneck@gmx.de",
      renterGroupId: renterGroup1.id,
    },
  })

  const renter3 = await db.renter.create({
    data: {
      name: "Test It",
      email: "testit@mail.de",
      renterGroupId: renterGroup2.id,
    },
  })

  const rentContract1 = await db.rentContract.create({
    data: {
      renterGroupId: renterGroup1.id,
      amount: 1000,
      startDate: new Date("2023-02-01"),
      parkingAmount: 100,
    },
  })

  const rentContract2 = await db.rentContract.create({
    data: {
      renterGroupId: renterGroup2.id,
      amount: 2000,
      startDate: new Date("2023-02-01"),
      parkingAmount: 80,
    },
  })

  const rentPeriod1 = await db.rentPeriod.create({
    data: {
      year: 2023,
      month: 2,
    },
  })

  const rentPeriod2 = await db.rentPeriod.create({
    data: {
      year: 2023,
      month: 3,
    },
  })

  await db.paidRent.create({
    data: {
      rentPeriodId: rentPeriod1.id,
      renterGroupId: renterGroup1.id,
      amount: 500,
      status: PaymentStatus.PARTIALLY_PAID,
    },
  })

  await db.paidRent.create({
    data: {
      rentPeriodId: rentPeriod1.id,
      renterGroupId: renterGroup2.id,
      amount: 1000,
      status: PaymentStatus.PARTIALLY_PAID,
    },
  })

  await db.paidRent.create({
    data: {
      rentPeriodId: rentPeriod2.id,
      renterGroupId: renterGroup1.id,
      amount: 1100,
      status: PaymentStatus.FULLY_PAID,
    },
  })

  await db.paidRent.create({
    data: {
      rentPeriodId: rentPeriod2.id,
      renterGroupId: renterGroup2.id,
      amount: 2100,
      status: PaymentStatus.OVERPAID,
    },
  })
}

export default seed
