import { resolver } from "@blitzjs/rpc"
import db, { PaymentStatus } from "db"
import * as z from "zod"
import { NotFoundError } from "blitz"
import { Prisma } from "../../../db"

const GetRentersByBuildingAndPaymentStatusSchema = z.object({
  buildingId: z.number(),
  rentPeriodId: z.number(),
})

async function getRentersByPaymentStatus(
  paymentStatus: PaymentStatus,
  latestRentPeriodId: number,
  buildingId: number
) {
  return await db.renter.findMany({
    where: {
      buildingId,
      rentPayments: {
        some: {
          rentPeriodId: latestRentPeriodId,
          status: paymentStatus,
        },
      },
    },
    include: {
      rentContract: true,
      rentPayments: {
        where: {
          rentPeriodId: latestRentPeriodId,
        },
      },
    },
  })
}

export type RentersByPaymentStatus = Prisma.PromiseReturnType<typeof getRentersByPaymentStatus>

export default resolver.pipe(
  resolver.zod(GetRentersByBuildingAndPaymentStatusSchema),
  async ({ buildingId, rentPeriodId }) => {
    if (!rentPeriodId) {
      throw new NotFoundError("No rent period found")
    }

    const overpaidRenters = await getRentersByPaymentStatus(
      PaymentStatus.OVERPAID,
      rentPeriodId,
      buildingId
    )
    const fullyPaidRenters = await getRentersByPaymentStatus(
      PaymentStatus.FULLY_PAID,
      rentPeriodId,
      buildingId
    )
    const partiallyPaidRenters = await getRentersByPaymentStatus(
      PaymentStatus.PARTIALLY_PAID,
      rentPeriodId,
      buildingId
    )
    const nothingPaidRenters = await getRentersByPaymentStatus(
      PaymentStatus.NOTHING_PAID,
      rentPeriodId,
      buildingId
    )

    return {
      [PaymentStatus.OVERPAID]: overpaidRenters,
      [PaymentStatus.FULLY_PAID]: fullyPaidRenters,
      [PaymentStatus.PARTIALLY_PAID]: partiallyPaidRenters,
      [PaymentStatus.NOTHING_PAID]: nothingPaidRenters,
    }
  }
)
