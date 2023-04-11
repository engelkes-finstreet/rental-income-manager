import {
  Flex,
  FormControl,
  FormControlProps,
  FormLabel,
} from "@chakra-ui/react";
import React, { ChangeEventHandler } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormError, useError } from "../form-error";
import { CustomSelect } from "./custom-select";

export type SelectProps = {
  name: string;
  children: React.ReactNode;
  label: string;
  autoFocus?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
} & Omit<FormControlProps, "onChange">;

export const LabeledSelect = ({
  name,
  children,
  label,
  autoFocus,
  onChange,
  ...rest
}: SelectProps) => {
  const { control } = useFormContext();
  const error = useError({ name });

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl id={name} isInvalid={Boolean(error)} {...rest}>
          <Flex justifyContent={"space-between"} alignItems={"flex-start"}>
            <FormLabel>{label}</FormLabel>
            <FormError name={name} />
          </Flex>
          <CustomSelect {...field}>{children}</CustomSelect>
        </FormControl>
      )}
    />
  );
};
