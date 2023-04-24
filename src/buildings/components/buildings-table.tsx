import getBuildings from "../queries/get-buildings"
import { Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react"
import { useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { getBuildingName } from "../../core/models/building"

export const BuildingsTable = () => {
  const [buildings] = useQuery(getBuildings, undefined)
  const router = useRouter()

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Addresse</Th>
          <Th>Anzahl an Mietern</Th>
        </Tr>
      </Thead>
      <Tbody>
        {buildings.map((building) => (
          <Tr
            key={building.id}
            onClick={async () => {
              await router.push(Routes.BuildingDetailPage({ buildingId: building.id }))
            }}
            cursor={"pointer"}
          >
            <Td>
              <Box>{getBuildingName(building)}</Box>
            </Td>
            <Td>
              <Box>{building.renterGroups.length}</Box>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
