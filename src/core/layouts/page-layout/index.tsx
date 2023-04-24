import React from "react"
import { Box, Button, ButtonGroup, Divider, Heading, HStack, VStack } from "@chakra-ui/react"
import { ButtonAction } from "../../../../types"

type Props = {
  children: React.ReactNode
  heading: string
  subheading?: string
  buttonActions?: {
    primaryAction?: ButtonAction
    secondaryAction?: ButtonAction
  }
}

export const PageLayout = ({ children, heading, subheading, buttonActions }: Props) => {
  return (
    <>
      <VStack gap={4}>
        <HStack justifyContent={"space-between"} width={"full"}>
          <VStack>
            <Heading size={"sm"}>{heading}</Heading>
            {subheading ? <Heading size={"xs"}>{subheading}</Heading> : null}
          </VStack>
          <ButtonGroup>
            {buttonActions?.secondaryAction ? (
              <Button onClick={buttonActions?.secondaryAction.onClick}>
                {buttonActions?.secondaryAction.label}
              </Button>
            ) : null}
            {buttonActions?.primaryAction ? (
              <Button variant={"primary"} onClick={buttonActions?.primaryAction.onClick}>
                {buttonActions?.primaryAction.label}
              </Button>
            ) : null}
          </ButtonGroup>
        </HStack>
        <Divider orientation="horizontal" />
        <Box width={"full"}>{children}</Box>
      </VStack>
    </>
  )
}
