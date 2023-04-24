import Form from "../../core/components/form/form"
import newBuilding, { NewBuildingSchema } from "../mutations/new-building"
import { LabeledInputField } from "../../core/components/form/fields/labeled-input-field"
import { HStack, Stack } from "@chakra-ui/react"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"
import { Building } from "db"
import editBuilding, { EditBuildingSchema } from "../mutations/edit-building"

const BuildingFormFields = () => {
  return (
    <>
      <LabeledInputField name={"city"} label={"Stadt"} />
      <Stack gap={4} width={"full"} direction={["column", "row"]}>
        <LabeledInputField name={"street"} label={"Straße"} />
        <LabeledInputField name={"number"} label={"Hausnummer"} type={"number"} />
      </Stack>
    </>
  )
}

export const NewBuildingForm = () => {
  const [newBuildingMutation] = useMutation(newBuilding)
  const router = useRouter()

  return (
    <Form
      schema={NewBuildingSchema}
      onSubmit={async (values) => {
        const building = await newBuildingMutation(values)
        await router.push(Routes.BuildingDetailPage({ buildingId: building.id }))
      }}
      submitText={"Gebäude anlegen"}
    >
      <BuildingFormFields />
    </Form>
  )
}

type EditBuildingFormProps = {
  building: Building
}

export const EditBuildingForm = ({ building }: EditBuildingFormProps) => {
  const [editBuildingMutation] = useMutation(editBuilding)
  const router = useRouter()

  return (
    <Form
      schema={EditBuildingSchema}
      onSubmit={async (values) => {
        await editBuildingMutation(values)
        await router.push(Routes.BuildingDetailPage({ buildingId: building.id }))
      }}
      initialValues={{
        id: building.id,
        city: building.city,
        street: building.street,
        number: building.number,
      }}
      submitText={"Gebäude bearbeiten"}
    >
      <BuildingFormFields />
    </Form>
  )
}
