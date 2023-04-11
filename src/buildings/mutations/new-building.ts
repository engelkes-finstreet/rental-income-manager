import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

export const NewBuildingSchema = z.object({
  city: z.string().min(1, "City is required"),
  street: z.string().min(1, "Street is required"),
  number: z.number().int().min(1, "Number must be greater than 0"),
  ownerId: z.number().int().optional(),
})

export default resolver.pipe(resolver.zod(NewBuildingSchema), async (input) => {
  return await db.building.create({ data: input })
})
