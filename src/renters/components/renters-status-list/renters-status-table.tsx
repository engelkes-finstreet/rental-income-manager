import { PaymentStatus } from "db"
import { RentersByPaymentStatus } from "src/renters/queries/get-renters-by-building-and-payment-status"
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Badge } from "@chakra-ui/react"
import { translatePaymentStatus } from "../../../core/translations/mapEnumToTranslation"
import { PaymentStatusBadge } from "../../../rent-payments/components/payment-status-badge"

type Props = {
  status: PaymentStatus
  renters: RentersByPaymentStatus
}

export const RentersStatusTable = ({ renters, status }: Props) => {
  if (renters.length === 0) {
    return null
  }

  return (
    <Box mb={8}>
      <Heading as="h3" size="md" mb={4}>
        <PaymentStatusBadge paymentStatus={status} />
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>IBAN</Th>
          </Tr>
        </Thead>
        <Tbody>
          {renters.map((renter) => (
            <Tr key={renter.id}>
              <Td>{renter.name}</Td>
              <Td>{renter.email}</Td>
              <Td>{renter.iban}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
