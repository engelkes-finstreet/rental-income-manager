import { useQuery } from "@blitzjs/rpc"
import getRenters from "../queries/get-renters"
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react"
import { Routes } from "@blitzjs/next"
import { useRouter } from "next/router"

export const RentersTable = () => {
  const [renterGroups] = useQuery(getRenters, undefined)
  console.log({ renterGroups })
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
        {renterGroups.map((renterGroup) => (
          <Tr
            key={renterGroup.id}
            onClick={async () => {
              await router.push(Routes.RenterDetailPage({ renterId: renterGroup.id }))
            }}
            cursor={"pointer"}
          >
            <Td>{renterGroup.renters[0]?.name}</Td>
            <Td>{renterGroup.renters[0]?.email}</Td>
            <Td>{renterGroup.iban}</Td>
            <Td>{renterGroup.rentContract?.amount}</Td>
            <Td>{renterGroup.rentContract?.parkingAmount}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
