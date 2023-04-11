import { FormErrorMessage, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

export function useError({ name }: { name: string }) {
  const {
    formState: { errors },
  } = useFormContext();
  const keys = name.split(".");

  let result: any = errors;
  if (Object.keys(result).length > 0) {
    for (const key of keys) {
      result = result[key];
    }
  }

  return result?.message;
}

type Props = {
  name: string;
};

export const FormError = ({ name }: Props) => {
  const error = useError({ name });

  if (error) {
    return <FormErrorMessage as={Text}>{`${error}`}</FormErrorMessage>;
  }

  return null;
};
