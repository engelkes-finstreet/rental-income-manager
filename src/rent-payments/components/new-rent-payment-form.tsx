import Form from "../../core/components/form/form"
import { LabeledInputField } from "../../core/components/form/fields/labeled-input-field"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { LabeledFileDropzone } from "../../core/components/form/fields/file-dropzone"
import * as z from "zod"

export const UploadRentPaymentSchema = z.object({
  file: z.instanceof(Object, { message: "Bitte eine Datei auswählen" }),
  year: z
    .number()
    .min(2000, { message: "Miete muss mindestens aus dem Jahr 2000 sein." })
    .max(2024, { message: "Miete darf maximal aus dem Jahr 2024 sein." }),
  month: z.number().min(1, "Muss ein Monat sein").max(12, "Muss ein Monat sein"),
})

const uploadFile = async ({ file, year, month }: { file: any; year: number; month: number }) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("year", year.toString())
  formData.append("month", month.toString())

  const response = await axios.post("/api/upload-rent-payment", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })

  return response.data
}

export const NewRentPaymentForm = () => {
  const uploadFileMutation = useMutation(uploadFile)

  return (
    <Form
      schema={UploadRentPaymentSchema}
      onSubmit={async (values) => {
        const result = await uploadFileMutation.mutateAsync(values)
      }}
      submitText={"Upload"}
    >
      <LabeledFileDropzone name={"file"} label={"CSV mit Mieteinnahmen"} />
      <LabeledInputField name={"year"} label={"Jahr"} type={"number"} />
      <LabeledInputField name={"month"} label={"Monat"} type={"number"} />
    </Form>
  )
}
