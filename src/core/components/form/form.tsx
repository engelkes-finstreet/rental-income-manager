import { ReactNode, PropsWithoutRef, useState } from "react"
import { FormProvider, useForm, UseFormProps } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Alert, AlertDescription, AlertIcon, Button, Flex, VStack } from "@chakra-ui/react"

export interface FormProps<S extends z.ZodType<any, any>>
  extends Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit"> {
  children?: ReactNode
  submitText?: string
  schema?: S
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  initialValues?: UseFormProps<z.infer<S>>["defaultValues"]
}

export interface OnSubmitResult {
  FORM_ERROR?: string
  [prop: string]: any
}

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const ctx = useForm<z.infer<S>>({
    mode: "onChange",
    resolver: schema ? zodResolver(schema) : undefined,
    defaultValues: initialValues,
  })

  const [formError, setFormError] = useState<string | null>(null)

  return (
    <FormProvider {...ctx}>
      <form
        onSubmit={ctx.handleSubmit(async (values) => {
          const result = (await onSubmit(values)) || {}
          for (const [key, value] of Object.entries(result)) {
            if (key === FORM_ERROR) {
              setFormError(value)
            } else {
              ctx.setError(key as any, {
                type: "submit",
                message: value,
              })
            }
          }
        })}
        className="form"
        {...props}
      >
        <VStack gap={8}>
          {formError && (
            <Alert status={"error"} variant={"solid"}>
              <AlertIcon />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          <VStack gap={2} width={"full"}>
            {children}

            {submitText && (
              <Flex justifyContent={"flex-end"} width={"full"}>
                <Button type="submit" disabled={ctx.formState.isSubmitting} variant={"primary"}>
                  {submitText}
                </Button>
              </Flex>
            )}
          </VStack>
        </VStack>
      </form>
    </FormProvider>
  )
}

export default Form
