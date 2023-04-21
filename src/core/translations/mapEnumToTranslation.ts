import { PaymentStatus } from "db"

const paymentStatusRecord: Record<PaymentStatus, string> = {
  FULLY_PAID: "Komplett bezahlt",
  NOTHING_PAID: "Nichts bezahlt",
  OVERPAID: "Überbezahlt",
  PARTIALLY_PAID: "Zum Teil bezahlt",
}

export function translatePaymentStatus(status: PaymentStatus) {
  return paymentStatusRecord[status]
}
