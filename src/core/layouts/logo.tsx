import { Routes } from "@blitzjs/next"
import { Text } from "@chakra-ui/react"
import Link from "next/link"

export const Logo = () => {
  return (
    <Link href={Routes.Home()} legacyBehavior>
      <Text as={"a"}>Rental Manager</Text>
    </Link>
  )
}
