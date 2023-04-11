import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

export const NewRenterSchema = z.object({
  renter: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    iban: z.string().min(1, "IBAN is required"),
    buildingId: z.number().int().min(1, "Building ID must be greater than 0"),
  }),
  rentContract: z.object({
    amount: z.number().min(1, "Amount is required"),
    startDate: z.date(),
    parkingAmount: z.number().optional(),
  }),
})

export default resolver.pipe(
  resolver.zod(NewRenterSchema),
  async ({ renter: renterInput, rentContract: rentContractInput }) => {
    const renter = await db.renter.create({ data: renterInput })
    const rentContract = await db.rentContract.create({
      data: {
        renterId: renter.id,
        ...rentContractInput,
      },
    })

    return {
      renter,
      rentContract,
    }
  }
)
