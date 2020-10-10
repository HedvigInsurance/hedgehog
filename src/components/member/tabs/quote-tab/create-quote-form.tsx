import {
  getCreateQuoteForMemberBySchemaOptions,
  useCreateQuoteForMemberBySchema,
} from 'graphql/use-create-quote-for-member-by-schema'
import { useSchemaForContractType } from 'graphql/use-get-schema-for-contract-type'
import { JsonSchemaForm } from 'hedvig-ui/json-schema-form'
import React, { useState } from 'react'
import { Checkbox } from 'semantic-ui-react'
import { WithShowNotification } from 'store/actions/notificationsActions'
import { ContractType } from 'utils/contract'
import { withShowNotification } from 'utils/notifications'

const CreateQuoteFormComponent: React.FC<{
  memberId: string
  contractType: ContractType
  onSubmitted: () => void
} & WithShowNotification> = ({
  memberId,
  contractType,
  onSubmitted,
  showNotification,
}) => {
  const [bypassUwgl, setBypassUwgl] = useState(false)

  const [schema, { loading }] = useSchemaForContractType(contractType)

  const [createQuoteForMember] = useCreateQuoteForMemberBySchema()

  const createQuote = (formData: Record<string, unknown>) => {
    createQuoteForMember(
      getCreateQuoteForMemberBySchemaOptions({
        memberId,
        schema,
        formData,
        bypassUnderwritingGuidelines: bypassUwgl,
      }),
    )
      .then(() => {
        onSubmitted()
      })
      .catch((error) => {
        showNotification({
          type: 'red',
          header: 'Error',
          message: error.message,
        })
      })
  }

  if (loading) {
    return null
  }

  return (
    <JsonSchemaForm
      schema={schema}
      onSubmit={createQuote}
      submitText={'Create'}
    >
      <Checkbox
        style={{ marginTop: '0.75rem' }}
        checked={bypassUwgl}
        onChange={(_, { checked }) => setBypassUwgl(Boolean(checked))}
        label={'Bypass underwriting guidelines'}
      />
    </JsonSchemaForm>
  )
}

export const CreateQuoteForm = withShowNotification(CreateQuoteFormComponent)
