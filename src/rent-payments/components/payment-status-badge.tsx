import { Badge } from "@chakra-ui/react"
import { PaymentStatus } from "db"
import { translatePaymentStatus } from "../../core/translations/mapEnumToTranslation"

const mapPaymentStatusToColor: Record<PaymentStatus, string> = {
  FULLY_PAID: "green",
  NOTHING_PAID: "red",
  OVERPAID: "green",
  PARTIALLY_PAID: "yellow",
}

type Props = {
  paymentStatus: PaymentStatus
}

export const PaymentStatusBadge = ({ paymentStatus }: Props) => {
  return (
    <Badge
      colorScheme={mapPaymentStatusToColor[paymentStatus]}
      size={"md"}
      px={4}
      py={2}
      fontSize={"md"}
    >
      {translatePaymentStatus(paymentStatus)}
    </Badge>
  )
}
