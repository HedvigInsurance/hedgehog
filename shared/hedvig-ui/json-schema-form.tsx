import { Grid, IconButton } from '@material-ui/core'
import {
  AjvError,
  ArrayFieldTemplateProps,
  ObjectFieldTemplateProps,
  WidgetProps,
} from '@rjsf/core'
import Form from '@rjsf/semantic-ui'
import { TrashIconWrapper } from 'components/claims/claim-details/components/claim-items/components/styles'
import { Button, ButtonsGroup } from 'hedvig-ui/button'
import { Spacing } from 'hedvig-ui/spacing'
import { FourthLevelHeadline } from 'hedvig-ui/typography'
import { JSONSchema7 } from 'json-schema'
import React, { useState } from 'react'
import { Trash } from 'react-bootstrap-icons'
import styled from 'react-emotion'
import { Dropdown, FormField } from 'semantic-ui-react'
import { convertCamelcaseToTitle, convertEnumToTitle } from 'utils/text'

const ContentWrapper = styled('div')<{ pushTop: boolean }>`
  margin-top: ${({ pushTop }) => (pushTop ? '2.75rem' : 0)};
  label {
    color: ${(p) => p.theme.foreground} !important;
  }
`
const ObjectFieldTemplate: React.FC<ObjectFieldTemplateProps> = ({
  properties,
}) => {
  return (
    <>
      <Grid container={true} spacing={8}>
        {properties.map((property, index) => {
          return (
            <Grid item={true} xs={6} key={property.name}>
              <ContentWrapper
                pushTop={
                  property.content.props.schema.type === 'boolean' &&
                  index % 2 === 1
                }
              >
                {property.content}
              </ContentWrapper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}

const ItemWrapper = styled('div')`
  margin: 1rem 0 1rem 0;
  &:not(:last-of-type) {
    padding-bottom: 0.75rem;
    border-bottom: 1px solid ${({ theme }) => theme.borderStrong};
  }
`

const ItemTitleWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
`

const ItemRemoveButton = styled(IconButton)`
  padding: 0.5rem;
`

const ArrayFieldTemplate: React.FC<ArrayFieldTemplateProps> = ({
  items,
  onAddClick,
  title,
}) => {
  return (
    <>
      {title && (
        <Spacing bottom={'small'}>
          <FourthLevelHeadline>
            {convertCamelcaseToTitle(title)}
          </FourthLevelHeadline>
        </Spacing>
      )}
      {items.map((element, index) => {
        return (
          <ItemWrapper key={element.key}>
            <ItemTitleWrapper>
              <strong>{index + 1}.</strong>
              <ItemRemoveButton onClick={element.onDropIndexClick(index)}>
                <TrashIconWrapper>
                  <Trash />
                </TrashIconWrapper>
              </ItemRemoveButton>
            </ItemTitleWrapper>
            {element.children}
          </ItemWrapper>
        )
      })}
      <Button
        fullWidth
        onClick={(e) => {
          e.preventDefault()
          onAddClick()
        }}
      >
        + Add
      </Button>
    </>
  )
}

const CustomSelectWidget: React.FC<WidgetProps> = ({
  id,
  label,
  value,
  onChange,
  schema,
}) => {
  return (
    <FormField>
      <label htmlFor={id}>{label}</label>
      <Dropdown
        id={id}
        style={{ borderRadius: '0.5rem' }}
        fluid
        selection
        value={value}
        onChange={(_, e) => onChange(e.value)}
        options={schema.enum!.map((enumValue) => {
          return {
            text: convertEnumToTitle(enumValue as string),
            value: enumValue as string,
          }
        })}
      />
    </FormField>
  )
}

const transformErrors = (errors: AjvError[]): AjvError[] => {
  return errors.map((error) => {
    const transformedError = { ...error }
    switch (error.name) {
      case 'type':
        if (error.params.type === 'integer') {
          transformedError.message = `Must be a number`
        } else if (error.params.type === 'string') {
          transformedError.message = `Must be a text`
        }
        break
      case 'maxLength':
        transformedError.message = `Should not be longer than ${transformedError.params.limit} characters`
        break
      case 'minLength':
        transformedError.message = `Should not be shorter than ${transformedError.params.limit} characters`
        break
      case 'minimum':
        transformedError.message = `Should be greater than ${!transformedError
          .params.exclusive && '(or equal to) '}${
          transformedError.params.limit
        }`
        break
      case 'maximum':
        transformedError.message = `Should be less than ${!transformedError
          .params.exlusive && '(or equal to) '}${transformedError.params.limit}`
        break
    }
    transformedError.stack = `${getPropertyTitle(transformedError.property)}: ${
      transformedError.message
    }`
    return transformedError
  })
}

const getPropertyTitle = (property) => {
  return convertCamelcaseToTitle(property.substring(1))
}

const formatInitialFormData = (
  initialFormData: Record<string, unknown>,
  schema: JSONSchema7,
): Record<string, unknown> => {
  const properties = schema.properties!
  const formData = { ...initialFormData }
  Object.entries(properties).forEach(([key, value]) => {
    formData[key] =
      initialFormData[key] ?? (value as JSONSchema7).default ?? undefined
  })
  return formData
}

export const JsonSchemaForm: React.FC<{
  schema: JSONSchema7
  onSubmit: (formData: Record<string, unknown>) => void
  initialFormData?: Record<string, unknown>
  submitText?: string
}> = ({ schema, onSubmit, initialFormData, submitText, children }) => {
  const uiSchema = {
    'ui:ObjectFieldTemplate': ObjectFieldTemplate,
  }
  const [formData, setFormData] = useState(
    formatInitialFormData(initialFormData ?? {}, schema),
  )
  return (
    <Form
      style={{ width: '100%' }}
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      onSubmit={(e) => {
        setFormData(e.formData)
        onSubmit(formData!)
      }}
      transformErrors={transformErrors}
      ArrayFieldTemplate={ArrayFieldTemplate}
      widgets={{ SelectWidget: CustomSelectWidget }}
    >
      <ButtonsGroup>
        <Button halfWidth variation={'primary'} type="submit">
          {submitText ?? 'Submit'}
        </Button>
        {children}
      </ButtonsGroup>
    </Form>
  )
}
