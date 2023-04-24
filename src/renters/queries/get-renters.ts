import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async (input) => {
  return await db.renterGroup.findMany({
    include: {
      renters: true,
      rentContract: true,
      rentPayments: true,
    },
  })
})
