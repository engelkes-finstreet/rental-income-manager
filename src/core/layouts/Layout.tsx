import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout, Routes } from "@blitzjs/next"
import { Box, Container } from "@chakra-ui/react"
import { Navbar } from "./nav-bar"
import { RouteUrlObject } from "blitz"
import { TbBuildingEstate, TbMoneybag } from "react-icons/tb"
import { IconType } from "react-icons"

export type NavItem = {
  label: string
  href: RouteUrlObject
  icon: IconType
}

export const navItems: NavItem[] = [
  {
    label: "Gebäude",
    href: Routes.BuildingsPage(),
    icon: TbBuildingEstate,
  },
  {
    label: "Mieter",
    href: Routes.RentersPage(),
    icon: TbBuildingEstate,
  },
  {
    label: "Mietzahlungen",
    href: Routes.RentPaymentsPage(),
    icon: TbMoneybag,
  },
]

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "rental-income-manager"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="section" height="100vh" overflowY="auto">
        <Navbar />
        <Container pt={{ base: "8", lg: "12" }} pb={{ base: "12", lg: "24" }}>
          {children}
        </Container>
      </Box>
    </>
  )
}

export default Layout
