import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { NotFoundError } from "blitz"

const GetBuildingSchema = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(GetBuildingSchema), async ({ id }) => {
  const building = await db.building.findUnique({
    where: {
      id,
    },
  })

  if (!building) {
    throw new NotFoundError(`Building with id ${id} not found`)
  }

  return building
})
