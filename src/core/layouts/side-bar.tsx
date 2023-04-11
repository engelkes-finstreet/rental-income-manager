import { Flex, Stack } from "@chakra-ui/react"
import { FiBarChart2, FiBookmark, FiCheckSquare, FiHome, FiUsers } from "react-icons/fi"
import { Logo } from "./logo"
import { NavButton } from "./nav-button"
import { UserProfile } from "./user-profile"
import { navItems } from "./Layout"

export const Sidebar = () => (
  <Flex as="section" minH="100vh" bg="bg-canvas">
    <Flex
      flex="1"
      bg="bg-accent"
      color="on-accent"
      maxW={{ base: "full", sm: "xs" }}
      py={{ base: "6", sm: "8" }}
      px={{ base: "4", sm: "6" }}
    >
      <Stack justify="space-between" spacing="1">
        <Stack spacing={{ base: "5", sm: "6" }} shouldWrapChildren>
          <Logo />
          <Stack spacing="1">
            {navItems.map((item) => (
              <NavButton key={item.label} label={item.label} icon={item.icon} href={item.href} />
            ))}
          </Stack>
        </Stack>
        <Stack spacing={{ base: "5", sm: "6" }}>
          <UserProfile
            name="Christoph Winston"
            image="https://tinyurl.com/yhkm2ek8"
            email="chris@chakra-ui.com"
          />
        </Stack>
      </Stack>
    </Flex>
  </Flex>
)
