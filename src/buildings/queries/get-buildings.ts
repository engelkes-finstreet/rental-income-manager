import { resolver } from "@blitzjs/rpc"
import db, { Prisma } from "db"

const getAllBuildings = resolver.pipe(async (input) => {
  return await db.building.findMany({
    include: {
      renterGroups: true,
    },
  })
})

export type GetAllBuildingsType = Prisma.PromiseReturnType<typeof getAllBuildings>

export default getAllBuildings
