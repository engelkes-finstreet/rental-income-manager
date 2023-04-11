import Form from "../../core/components/form/form"
import newBuilding, { NewBuildingSchema } from "../mutations/new-building"
import { LabeledInputField } from "../../core/components/form/fields/labeled-input-field"
import { HStack, Stack } from "@chakra-ui/react"
import { useMutation } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import { Routes } from "@blitzjs/next"

export const NewBuildingForm = () => {
  const [newBuildingMutation] = useMutation(newBuilding)
  const router = useRouter()

  return (
    <Form
      schema={NewBuildingSchema}
      onSubmit={async (values) => {
        await newBuildingMutation(values)
        await router.push(Routes.Home())
      }}
      submitText={"Gebäude anlegen"}
    >
      <LabeledInputField name={"city"} label={"Stadt"} />
      <Stack gap={4} width={"full"} direction={["column", "row"]}>
        <LabeledInputField name={"street"} label={"Straße"} />
        <LabeledInputField name={"number"} label={"Hausnummer"} type={"number"} />
      </Stack>
    </Form>
  )
}
