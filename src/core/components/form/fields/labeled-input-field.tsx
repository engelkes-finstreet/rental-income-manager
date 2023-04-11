import React, { forwardRef } from "react"
import { useFormContext } from "react-hook-form"
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
} from "@chakra-ui/react"
import { FormError, useError } from "../form-error"

type Props = {
  label?: string
  placeholder?: string
  name: string
  inputLeftElement?: React.ReactNode
} & InputProps

export const LabeledInputField = forwardRef<HTMLInputElement, Props>(
  ({ id, label, placeholder, name, type, inputLeftElement, hidden, ...props }) => {
    const {
      register,
      formState: { isSubmitting },
    } = useFormContext()
    const error = useError({ name })

    return (
      <FormControl id={name} isInvalid={Boolean(error)} hidden={hidden}>
        <Flex justifyContent={"space-between"} alignItems={"flex-start"}>
          <FormLabel>{label}</FormLabel>
          <FormError name={name} />
        </Flex>
        <InputGroup>
          {inputLeftElement && (
            <InputLeftElement pointerEvents={"none"}>{inputLeftElement}</InputLeftElement>
          )}
          <Input
            placeholder={placeholder ? placeholder : label}
            type={type}
            disabled={isSubmitting}
            {...register(name, {
              setValueAs: (value) => {
                switch (type) {
                  case "number":
                    return Number(value)
                  case "date":
                    return new Date(value)
                  default:
                    return value
                }
              },
            })}
            {...props}
          />
        </InputGroup>
      </FormControl>
    )
  }
)
