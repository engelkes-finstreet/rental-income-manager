import { resolver } from "@blitzjs/rpc"
import db from "db"
import * as z from "zod"
import { NewRenterSchema } from "./new-renter"

const EditRenterSchema = NewRenterSchema.extend({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(EditRenterSchema), async (input) => {
  return db.renter.update({
    where: { id: input.id },
    data: input,
  })
})
