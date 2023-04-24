import { PaymentStatus } from "db"
import { RentersByPaymentStatus } from "src/renters/queries/get-renters-by-building-and-payment-status"
import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td, Badge } from "@chakra-ui/react"
import { PaymentStatusBadge } from "../../../rent-payments/components/payment-status-badge"

type Props = {
  status: PaymentStatus
  renterGroups: RentersByPaymentStatus
}

export const RentersStatusTable = ({ renterGroups, status }: Props) => {
  if (renterGroups.length === 0) {
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
          {renterGroups.map((renterGroup) => (
            <Tr key={renterGroup.id}>
              <Td>{renterGroup.renters[0]?.name}</Td>
              <Td>{renterGroup.renters[0]?.email}</Td>
              <Td>{renterGroup.iban}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
