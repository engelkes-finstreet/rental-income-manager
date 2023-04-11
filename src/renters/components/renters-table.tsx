import { useQuery } from "@blitzjs/rpc"
import getRenters from "../queries/get-renters"
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"

export const RentersTable = () => {
  const [renters] = useQuery(getRenters, undefined)
  const router = useRouter()

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>E-Mail</Th>
          <Th>IBAN</Th>
          <Th>Miete</Th>
          <Th>Parkplatzmiete</Th>
        </Tr>
      </Thead>
      <Tbody>
        {renters.map((renter) => (
          <Tr
            key={renter.id}
            onClick={async () => {
              await router.push(Routes.RenterDetailPage({ renterId: renter.id }))
            }}
            cursor={"pointer"}
          >
            <Td>{renter.name}</Td>
            <Td>{renter.email}</Td>
            <Td>{renter.iban}</Td>
            <Td>{renter.rentContract?.amount}</Td>
            <Td>{renter.rentContract?.parkingAmount}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
