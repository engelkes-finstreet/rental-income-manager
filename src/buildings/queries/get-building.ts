import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"

const GetBuildingSchema = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(GetBuildingSchema), async (input) => {
  return db.building.findUnique({
    where: {
      id: input.id,
    },
  })
})
