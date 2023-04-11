import { resolver } from "@blitzjs/rpc"
import * as z from "zod"

export const NewRentPaymentSchema = z.object({
  file: z.any(),
})

export default resolver.pipe(resolver.zod(NewRentPaymentSchema), async (input) => {
  const file = input.file
})
