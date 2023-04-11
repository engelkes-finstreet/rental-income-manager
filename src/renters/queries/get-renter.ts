import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const GetRenterSchema = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(GetRenterSchema), async (input) => {
  return db.renter.findUnique({
    where: {
      id: input.id,
    },
  })
})
