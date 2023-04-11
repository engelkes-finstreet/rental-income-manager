import Form from "../../core/components/form/form"
import newRenter, { NewRenterSchema } from "../mutations/new-renter"
import { LabeledInputField } from "../../core/components/form/fields/labeled-input-field"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import getBuildings from "../../buildings/queries/get-buildings"
import { LabeledSelect } from "src/core/components/form/fields/labeled-select"
import { Option } from "src/core/components/form/fields/custom-select/option"
import React from "react"
import { Heading, HStack, Text, VStack } from "@chakra-ui/react"

export const NewRenterForm = () => {
  const [buildings] = useQuery(getBuildings, undefined)
  const [newRenterMutation] = useMutation(newRenter)
  const router = useRouter()

  return (
    <Form
      schema={NewRenterSchema}
      onSubmit={async (values) => {
        await newRenterMutation(values)
        await router.push(Routes.Home())
      }}
      submitText={"Renter anlegen"}
      initialValues={{
        renter: {
          name: "",
          email: "",
          iban: "",
          buildingId: buildings[0]?.id ?? undefined,
        },
        rentContract: {
          amount: 0,
          startDate: undefined,
          parkingAmount: 0,
        },
      }}
    >
      <Heading size={"sm"} alignSelf={"flex-start"}>
        Mieter
      </Heading>
      <VStack gap={2} width={"full"}>
        <LabeledInputField name={"renter.name"} label={"Name"} />
        <LabeledInputField name={"renter.iban"} label={"Iban"} />
        <LabeledInputField name={"renter.email"} label={"E-Mail"} type={"email"} />
        <LabeledSelect name={"renter.buildingId"} label={"Building"}>
          {buildings.map((building) => (
            <Option key={building.id} value={building.id}>
              <HStack>
                <Text>{`${building.street} ${building.number}, ${building.city}`}</Text>
              </HStack>
            </Option>
          ))}
        </LabeledSelect>
      </VStack>
      <Heading size={"sm"} alignSelf={"flex-start"}>
        Mietvertrag
      </Heading>
      <VStack gap={2} width={"full"}>
        <LabeledInputField name={"rentContract.amount"} label={"Miete"} type={"number"} />
        <LabeledInputField
          name={"rentContract.parkingAmount"}
          label={"Parkplatz"}
          type={"number"}
        />
        <LabeledInputField name={"rentContract.startDate"} label={"Startdatum"} type={"date"} />
      </VStack>
    </Form>
  )
}
