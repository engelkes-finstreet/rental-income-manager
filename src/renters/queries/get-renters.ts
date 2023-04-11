import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async (input) => {
  return db.renter.findMany({
    include: {
      rentContract: true,
      rentPayments: true,
    },
  })
})
