import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Container,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react"
import { Logo } from "./logo"
import { Sidebar } from "./side-bar"
import { ToggleButton } from "./toggle-button"
import { NavItem, navItems } from "./Layout"
import Link from "next/link"
import { useAriaCurrentPage } from "../hooks/use-aria-current"
import { RouteUrlObject } from "blitz"
import React from "react"

type NavBarButtonProps = {
  navItem: NavItem
}

const NavBarButton = ({ navItem }: NavBarButtonProps) => {
  const ariaCurrent = useAriaCurrentPage(navItem.href)

  return (
    <Link href={navItem.href} key={navItem.href.pathname} passHref legacyBehavior>
      <Button as={"a"} aria-current={ariaCurrent}>
        {navItem.label}
      </Button>
    </Link>
  )
}

export const Navbar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const { isOpen, onToggle, onClose } = useDisclosure()

  return (
    <Box as="nav" bg="bg-accent" color="on-accent">
      <Container py={{ base: "3", lg: "4" }}>
        <Flex justify="space-between">
          <HStack spacing="4">
            <Logo />
            {isDesktop && (
              <ButtonGroup variant="ghost-on-accent" spacing="1">
                {navItems.map((item) => (
                  <NavBarButton navItem={item} />
                ))}
              </ButtonGroup>
            )}
          </HStack>
          {isDesktop ? (
            <HStack spacing="4">
              <Avatar boxSize="10" name="Christoph Winston" src="https://tinyurl.com/yhkm2ek8" />
            </HStack>
          ) : (
            <>
              <ToggleButton isOpen={isOpen} aria-label="Open Menu" onClick={onToggle} />
              <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                isFullHeight
                preserveScrollBarGap
                // Only disabled for showcase
                trapFocus={false}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <Sidebar />
                </DrawerContent>
              </Drawer>
            </>
          )}
        </Flex>
      </Container>
    </Box>
  )
}
