import { MutationFunctionOptions } from '@apollo/react-common'
import {
  AddTermsAndConditionsMutation,
  AddTermsAndConditionsMutationVariables,
  TermsAndConditionsInput,
  useAddTermsAndConditionsMutation,
} from 'api/generated/graphql'
// import { Button } from 'hedvig-ui/button'
import { Form, SubmitButton } from 'hedvig-ui/form'
import React, { useState } from 'react'
// import ReactDropZone from 'react-dropzone'
import { FormProvider, useForm } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import { WithShowNotification } from 'store/actions/notificationsActions'
import { withShowNotification } from 'utils/notifications'

const useAddTermsAndConditions = () => useAddTermsAndConditionsMutation()

const getAddTermsAndConditionsOptions = (
  termsAndConditionsInput: TermsAndConditionsInput,
): MutationFunctionOptions<
  AddTermsAndConditionsMutation,
  AddTermsAndConditionsMutationVariables
> => {
  console.log(termsAndConditionsInput.file)
  return {
    variables: {
      input: termsAndConditionsInput,
    },
  }
}

const AddTermsAndConditionsToolComponent: React.FC<{} & WithShowNotification> = ({
  showNotification,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const form = useForm()
  const [addTermsAndConditions] = useAddTermsAndConditions()

  const onSubmit = (data: FieldValues) => {
    const input = { ...data }
    input.file = selectedFile
    addTermsAndConditions(
      getAddTermsAndConditionsOptions(input as TermsAndConditionsInput),
    )
      .then(() => {
        showNotification({
          message: 'Terms added',
          header: 'Success',
          type: 'olive',
        })
        form.reset()
      })
      .catch((e) => {
        showNotification({
          message: e.message,
          header: 'Error',
          type: 'red',
        })
      })
  }

  // const handleFileUpload = ([file]: File[]) => {
  //   console.log('file: ' + file)
  //   if (!file) {
  //     return
  //   }
  //   const reader = new FileReader()
  //   reader.onload = (e) => {
  //     e.target.
  //     selectedFile = file
  //   }
  //   reader.readAsText(file)
  //   selectedFile = file
  // }

  return (
    <>
      <input
        type="file"
        placeholder="Choose a file"
        onChange={({
          target: {
            // @ts-ignore
            files: [file],
          },
        }) => {
          setSelectedFile(file)
        }}
      />
      <FormProvider {...form}>
        <Form onSubmit={onSubmit}>
          <SubmitButton variation="primary">Add terms</SubmitButton>
        </Form>
      </FormProvider>
    </>
  )
}

export const AddTermsAndConditionsTool = withShowNotification(
  AddTermsAndConditionsToolComponent,
)
