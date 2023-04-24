import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

export const NewRenterSchema = z.object({
  renterGroup: z.object({
    iban: z.string().min(1, "IBAN is required"),
    buildingId: z.number().int().min(1, "Building ID must be greater than 0"),
  }),
  renters: z
    .object({
      name: z.string().min(1, "Name is required"),
      email: z.string().email("Invalid email address"),
    })
    .array(),
  rentContract: z.object({
    amount: z.number().min(1, "Amount is required"),
    startDate: z.date(),
    parkingAmount: z.number().optional(),
  }),
})

export default resolver.pipe(
  resolver.zod(NewRenterSchema),
  async ({
    renters: rentersInput,
    rentContract: rentContractInput,
    renterGroup: renterGroupInput,
  }) => {
    const renterGroup = await db.renterGroup.create({
      data: renterGroupInput,
    })

    await db.rentContract.create({
      data: {
        renterGroupId: renterGroup.id,
        ...rentContractInput,
      },
    })
    for (let renterInput of rentersInput) {
      await db.renter.create({
        data: {
          renterGroupId: renterGroup.id,
          ...renterInput,
        },
      })
    }

    return renterGroup
  }
)
