import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const GetRenterGroupSchema = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(GetRenterGroupSchema), async (input) => {
  return db.renterGroup.findUnique({
    where: {
      id: input.id,
    },
  })
})
