import Form from "../../core/components/form/form"
import newRenter, { NewRenterSchema } from "../mutations/new-renter"
import { LabeledInputField } from "../../core/components/form/fields/labeled-input-field"
import { useMutation, useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import getBuildings, { GetAllBuildingsType } from "../../buildings/queries/get-buildings"
import { LabeledSelect } from "src/core/components/form/fields/labeled-select"
import { Option } from "src/core/components/form/fields/custom-select/option"
import React from "react"
import { Button, Heading, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import { useFieldArray } from "react-hook-form"
import { TbX } from "react-icons/tb"

type RenterFormFieldProps = {
  buildings: GetAllBuildingsType
}

const RenterFormFields = ({ buildings }: RenterFormFieldProps) => {
  const { fields, append } = useFieldArray({ name: "renters" })

  return (
    <>
      <Heading size={"sm"} alignSelf={"flex-start"}>
        Mieter
      </Heading>
      <VStack gap={2} width={"full"}>
        <LabeledInputField name={"renterGroup.iban"} label={"Iban"} />
        <LabeledSelect name={"renterGroup.buildingId"} label={"Building"}>
          {buildings.map((building) => (
            <Option key={building.id} value={building.id}>
              <HStack>
                <Text>{`${building.street} ${building.number}, ${building.city}`}</Text>
              </HStack>
            </Option>
          ))}
        </LabeledSelect>
        <VStack w={"full"} gap={4}>
          {fields.map((field, index) => (
            <VStack width={"full"} alignItems={"flex-start"}>
              <Text color={"muted"} fontSize={"sm"}>
                Mieter {index + 1}
              </Text>
              <HStack key={field.id} gap={2} width={"full"} alignItems={"center"}>
                <LabeledInputField name={`renters.${index}.name`} label={"Name"} />
                <LabeledInputField name={`renters.${index}.email`} label={"Email"} />
                <Icon as={TbX} boxSize="6" color="red" />
              </HStack>
            </VStack>
          ))}
          <Button variant={"primary"} onClick={() => append({ name: "", email: "" })}>
            Weiteren Mieter hinzufügen
          </Button>
        </VStack>
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
    </>
  )
}

export const NewRenterForm = () => {
  const [newRenterMutation] = useMutation(newRenter)
  const router = useRouter()
  const [buildings] = useQuery(getBuildings, undefined)

  return (
    <Form
      schema={NewRenterSchema}
      onSubmit={async (values) => {
        const renterGroup = await newRenterMutation(values)
        await router.push(Routes.RenterDetailPage({ renterId: renterGroup.id }))
      }}
      submitText={"Mieter anlegen"}
      initialValues={{
        renterGroup: {
          iban: "",
          buildingId: buildings[0]?.id,
        },
        renters: [
          {
            name: "",
            email: "",
          },
        ],
        rentContract: {
          amount: 0,
          startDate: undefined,
          parkingAmount: 0,
        },
      }}
    >
      <RenterFormFields buildings={buildings} />
    </Form>
  )
}
