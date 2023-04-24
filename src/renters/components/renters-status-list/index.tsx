import { useQuery } from "@blitzjs/rpc"
import getRentersByBuildingAndPaymentStatus from "../../queries/get-renters-by-building-and-payment-status"
import { useParam } from "@blitzjs/next"
import { Box, Flex, Heading, HStack, Text } from "@chakra-ui/react"
import { RentersStatusTable } from "./renters-status-table"
import { PaymentStatus } from "db"
import getAllRentPeriods from "../../../rent-periods/queries/get-all-rent-periods"
import { useState } from "react"
import { CustomSelect } from "../../../core/components/form/fields/custom-select"
import { Option } from "../../../core/components/form/fields/custom-select/option"
import { rentPeriodToString } from "../../../core/models/rent-period"

export const RentersStatusList = () => {
  const buildingId = useParam("buildingId", "number")
  const [rentPeriods] = useQuery(getAllRentPeriods, null)
  const [selectedRentPeriod, setSelectedRentPeriod] = useState<string | number | null | undefined>(
    rentPeriods[0]?.id
  )
  const [renterGroupsByStatus] = useQuery(getRentersByBuildingAndPaymentStatus, {
    buildingId: buildingId!!,
    rentPeriodId: selectedRentPeriod!! as number,
  })

  return (
    <Box w={"full"}>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading as={"h2"} size={"xs"} mb={6}>
          Status Mietzahlungen
        </Heading>
        <HStack gap={4}>
          <Text>Zeitraum:</Text>
          <CustomSelect
            onChange={(item) => {
              setSelectedRentPeriod(item)
            }}
            value={selectedRentPeriod}
          >
            {rentPeriods.map((rentPeriod) => (
              <Option value={rentPeriod.id} key={rentPeriod.id}>
                <HStack>
                  <Text>{rentPeriodToString(rentPeriod)}</Text>
                </HStack>
              </Option>
            ))}
          </CustomSelect>
        </HStack>
      </Flex>
      {Object.entries(renterGroupsByStatus).map(([status, renterGroups]) => (
        <RentersStatusTable
          key={status}
          status={status as PaymentStatus}
          renterGroups={renterGroups}
        />
      ))}
    </Box>
  )
}
