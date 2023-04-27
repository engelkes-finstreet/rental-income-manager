import { Box, VStack, Text, Badge, HStack, Divider } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"

const MotionBox = motion(Box)

const BuildingCard = ({ building }) => {
  const { city, street, number, expectedRent, receivedRent } = building
  const router = useRouter()

  const hoverAnimation = {
    scale: 1.03,
    transition: { duration: 0.2 },
  }

  return (
    <MotionBox
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={6}
      width={"full"}
      whileHover={hoverAnimation}
      cursor={"pointer"}
      onClick={() => router.push(Routes.BuildingDetailPage({ buildingId: building.id }))}
    >
      <VStack align="start" spacing={4} width={"full"}>
        <HStack justifyContent={"space-between"} width={"full"}>
          <VStack alignItems={"flex-start"}>
            <Text fontWeight="bold" fontSize="2xl">
              {street} {number}
            </Text>
            <Text fontSize="xl">{city}</Text>
          </VStack>
          <Badge
            colorScheme={receivedRent >= expectedRent ? "green" : "red"}
            fontSize={"1.2em"}
            p={4}
          >
            {receivedRent >= expectedRent ? "Voll Bezahlt" : "Zahlungen ausstehend"}
          </Badge>
        </HStack>

        <Divider />

        <HStack justifyContent={"space-evenly"} width={"full"}>
          <HStack spacing={4}>
            <Text fontSize="md" fontWeight="bold">
              Erwartete Miete:
            </Text>
            <Badge fontSize="md" colorScheme="green">
              {expectedRent.toFixed(2)}
            </Badge>
          </HStack>

          <HStack spacing={4}>
            <Text fontSize="md" fontWeight="bold">
              Erhaltene Miete:
            </Text>
            <Badge fontSize="md" colorScheme="blue">
              {receivedRent.toFixed(2)}
            </Badge>
          </HStack>
        </HStack>
      </VStack>
    </MotionBox>
  )
}

export default BuildingCard
