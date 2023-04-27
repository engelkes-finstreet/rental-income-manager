import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"
import * as z from "zod"

const getAllBuildingsWithRentInfo = resolver.pipe(async () => {
  const latestRentPeriod = await db.rentPeriod.findFirst({
    orderBy: [{ year: "desc" }, { month: "desc" }],
  })

  if (!latestRentPeriod) {
    throw new Error("No rent period found")
  }

  const buildings = await db.building.findMany({
    include: {
      renterGroups: {
        include: {
          rentContract: true,
          rentPayments: {
            where: {
              rentPeriodId: latestRentPeriod.id,
            },
          },
        },
      },
    },
  })

  const buildingsWithRentInfo = buildings.map((building) => {
    const expectedRent = building.renterGroups.reduce((sum, renterGroup) => {
      const rentAmount = renterGroup.rentContract?.amount ?? 0
      const parkingAmount = renterGroup.rentContract?.parkingAmount ?? 0
      return sum + rentAmount + parkingAmount
    }, 0)

    const receivedRent = building.renterGroups.reduce(
      (sum, renterGroup) =>
        sum + renterGroup.rentPayments.reduce((sum, paidRent) => sum + paidRent.amount, 0),
      0
    )

    return {
      ...building,
      expectedRent,
      receivedRent,
    }
  })

  return buildingsWithRentInfo
})

type GetAllBuildingsWithRentInfo = Prisma.PromiseReturnType<typeof getAllBuildingsWithRentInfo>

export default getAllBuildingsWithRentInfo
