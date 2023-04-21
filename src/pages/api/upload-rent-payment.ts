import db, { PaymentStatus } from "db"
import { NextApiRequest, NextApiResponse } from "next"
import Papa from "papaparse"
import { uploadMiddleware } from "src/core/middlewares/upload-middleware"
import * as z from "zod"

export const UploadRentPaymentSchema = z.object({
  year: z.string().transform((value) => parseInt(value)),
  month: z.string().transform((value) => parseInt(value)),
})

type RentPeriod = z.infer<typeof UploadRentPaymentSchema>

export const config = {
  api: {
    bodyParser: false,
  },
}

type UploadRentPayment = {
  name: string
  iban: string
  amount: number
}

function parseCSVContent(csvContent: string) {
  const parseResult = Papa.parse(csvContent, {
    header: false,
    skipEmptyLines: "greedy",
    dynamicTyping: true,
  })
  //remove the first row and save in new object
  const data = parseResult.data.slice(1)
  const result = data.map<UploadRentPayment>((row: any) => {
    return {
      name: row[0],
      iban: row[1],
      amount: row[2],
    }
  })

  return result
}

function determinePaymentStatus(rentToPay: number, amountPaid: number): PaymentStatus {
  if (amountPaid === 0) {
    return PaymentStatus.NOTHING_PAID
  }
  if (amountPaid < rentToPay) {
    return PaymentStatus.PARTIALLY_PAID
  }
  if (amountPaid === rentToPay) {
    return PaymentStatus.FULLY_PAID
  }
  return PaymentStatus.OVERPAID
}

async function calculatePaidRent(
  uploadRentContent: UploadRentPayment[],
  rentPeriodInput: RentPeriod
) {
  const rentPeriod = await db.rentPeriod.create({
    data: {
      ...rentPeriodInput,
    },
  })

  const renters = await db.renter.findMany({
    include: {
      rentContract: true,
    },
  })

  for (const renter of renters) {
    const matchingPayment = uploadRentContent.find((payment) => payment.iban === renter.iban)

    if (matchingPayment && renter.rentContract) {
      const parkingAmount = renter.rentContract.parkingAmount || 0
      const rentToPay = renter.rentContract.amount + parkingAmount
      const rentPaymentStatus = determinePaymentStatus(rentToPay, matchingPayment.amount)

      await db.paidRent.create({
        data: {
          renterId: renter.id,
          status: rentPaymentStatus,
          amount: matchingPayment.amount,
          rentPeriodId: rentPeriod.id,
        },
      })
    }
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await uploadMiddleware(req, res)

      const buffer = req.file.buffer
      const csvContent = parseCSVContent(buffer.toString())
      const input = UploadRentPaymentSchema.parse(req.body)

      await calculatePaidRent(csvContent, input)

      res.status(200).send({ message: "File uploaded successfully" })
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}

export default handler
