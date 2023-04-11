import React, { useCallback } from "react"
import { Box, Flex, FormControl, FormLabel, Text, VStack } from "@chakra-ui/react"
import { useDropzone } from "react-dropzone"
import { Controller, useFormContext } from "react-hook-form"
import { FormError, useError } from "../form-error"

const FileDropzone = ({ onChange }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      onChange(acceptedFiles[0])
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    maxFiles: 1,
  })

  const withoutFiles = isDragActive ? (
    <Text>Drop the file here...</Text>
  ) : (
    <Text>Drag and drop a file here, or click to select a file</Text>
  )

  return (
    <VStack
      {...getRootProps()}
      alignItems="center"
      justifyContent="center"
      border="2px"
      borderRadius="lg"
      borderColor="gray.300"
      p={4}
      w="100%"
      h="200px"
      cursor="pointer"
      transition="border-color 0.2s"
      _hover={{ borderColor: "gray.500" }}
    >
      <input {...getInputProps()} />
      <Box>{acceptedFiles.length ? acceptedFiles[0]?.name : withoutFiles}</Box>
    </VStack>
  )
}

type FileDropzoneControllerProps = {
  name: string
  label: string
}

export const LabeledFileDropzone = ({ name, label }: FileDropzoneControllerProps) => {
  const { control } = useFormContext()
  const error = useError({ name })

  return (
    <FormControl id={name} isInvalid={Boolean(error)}>
      <Flex justifyContent={"space-between"} alignItems={"flex-start"}>
        <FormLabel>{label}</FormLabel>
        <FormError name={name} />
      </Flex>
      <Controller
        control={control}
        name={name}
        render={({ field }) => <FileDropzone onChange={field.onChange} />}
      />
    </FormControl>
  )
}
