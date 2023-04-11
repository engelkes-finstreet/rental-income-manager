import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { NewBuildingSchema } from "./new-building"

const EditBuildingSchema = NewBuildingSchema.extend({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(EditBuildingSchema), async (input) => {
  return db.building.update({
    where: { id: input.id },
    data: input,
  })
})
