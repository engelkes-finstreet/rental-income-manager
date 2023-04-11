import { As, Button, ButtonProps, HStack, Icon, Text } from "@chakra-ui/react"
import { RouteUrlObject } from "blitz"
import Link from "next/link"

interface NavButtonProps extends ButtonProps {
  icon: As
  label: string
  href: RouteUrlObject
}

export const NavButton = ({ icon, label, href, ...buttonProps }: NavButtonProps) => {
  return (
    <Link href={href} passHref>
      <Button as={"a"} variant="ghost-on-accent" justifyContent="start" {...buttonProps}>
        <HStack spacing="3">
          <Icon as={icon} boxSize="6" color="on-accent-subtle" />
          <Text>{label}</Text>
        </HStack>
      </Button>
    </Link>
  )
}
