import { ErrorMessage } from '@hookform/error-message'
import { Button, ButtonProps } from 'hedvig-ui/button'
import React from 'react'
import styled from 'react-emotion'
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form'
import { FieldValues } from 'react-hook-form/dist/types/fields'
import {
  Dropdown,
  DropdownItemProps,
  Form as SemanticForm,
  FormProps,
} from 'semantic-ui-react'

const StyledForm = styled(SemanticForm)`
  width: 100%;
`

export const Form: React.FC<{
  onSubmit: (data: FieldValues) => void
} & FormProps> = ({ onSubmit, children, ...props }) => {
  const { handleSubmit } = useFormContext()

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)} {...props}>
      {children}
    </StyledForm>
  )
}

const ErrorMessageWrapper = styled('div')`
  color: ${({ theme }) => theme.danger};
  margin: 0;
`

const FormLabel: React.FC<{ name: string } & React.HTMLProps<
  HTMLLabelElement
>> = ({ name, children, ...props }) => {
  return (
    <label htmlFor={name} {...props}>
      {children}
    </label>
  )
}

const FormError: React.FC<{
  name: string
}> = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={({ message }) => {
        return <ErrorMessageWrapper>{message}</ErrorMessageWrapper>
      }}
    />
  )
}

interface FormFieldProps {
  label: React.ReactNode
  name: string
  defaultValue: unknown
  rules?: RegisterOptions
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  rules,
  children,
}) => {
  const { errors } = useFormContext()
  return (
    <SemanticForm.Field
      required={Boolean(rules?.required)}
      error={errors && Boolean(errors[name.split('.')[0]])}
    >
      <FormLabel name={name}>{label}</FormLabel>
      {children}
      <FormError name={name} />
    </SemanticForm.Field>
  )
}

export const SubmitButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  const {
    formState: { isSubmitting },
  } = useFormContext()
  return (
    <Button disabled={isSubmitting} type={'submit'} {...props}>
      {children}
    </Button>
  )
}

interface FormInputProps {
  type?: 'number' | 'text'
}

const FormInputComponent: React.FC<FormInputProps & FormFieldProps> = ({
  name,
  type,
  rules,
  defaultValue,
}) => {
  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      as={<input type={type} />}
    />
  )
}

export const FormInput: React.FC<FormInputProps & FormFieldProps> = ({
  type = 'text',
  ...props
}) => {
  return (
    <FormField {...props}>
      <FormInputComponent type={type} {...props} />
    </FormField>
  )
}

interface FormDropdownProps {
  options: DropdownItemProps[]
}

const FormDropdownComponent: React.FC<FormDropdownProps & FormFieldProps> = ({
  name,
  rules,
  defaultValue,
  options,
}) => {
  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ onChange, value, onBlur }) => {
        return (
          <Dropdown
            options={options}
            fluid
            selection
            value={value}
            onChange={(_, e) => onChange(e.value)}
            onBlur={onBlur}
          />
        )
      }}
    />
  )
}

export const FormDropdown: React.FC<FormDropdownProps & FormFieldProps> = ({
  options,
  ...props
}) => {
  return (
    <FormField {...props}>
      <FormDropdownComponent options={options} {...props} />
    </FormField>
  )
}
