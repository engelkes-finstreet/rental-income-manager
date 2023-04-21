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

export const RentersStatusList = () => {
  const buildingId = useParam("buildingId", "number")
  const [rentPeriods] = useQuery(getAllRentPeriods, null)
  const [selectedRentPeriod, setSelectedRentPeriod] = useState<string | number | null | undefined>(
    rentPeriods[0]?.id
  )
  const [rentersByStatus] = useQuery(getRentersByBuildingAndPaymentStatus, {
    buildingId: buildingId!!,
    rentPeriodId: selectedRentPeriod!! as number,
  })

  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading as={"h2"} size={"lg"} mb={6}>
          Renters Payment Status
        </Heading>
        <CustomSelect
          onChange={(item) => {
            setSelectedRentPeriod(item)
          }}
          value={selectedRentPeriod}
        >
          {rentPeriods.map((rentPeriod) => (
            <Option value={rentPeriod.id} key={rentPeriod.id}>
              <HStack>
                <Text>{`${rentPeriod.month} ${rentPeriod.year}`}</Text>
              </HStack>
            </Option>
          ))}
        </CustomSelect>
      </Flex>
      {Object.entries(rentersByStatus).map(([status, renters]) => (
        <RentersStatusTable key={status} status={status as PaymentStatus} renters={renters} />
      ))}
    </Box>
  )
}
