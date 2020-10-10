import { Quote } from 'api/generated/graphql'
import {
  getUpdateQuoteSchemaOptions,
  useUpdateQuoteBySchema,
} from 'graphql/use-update-quote-by-schema'
import { JsonSchemaForm } from 'hedvig-ui/json-schema-form'
import React, { useState } from 'react'
import { Checkbox } from 'semantic-ui-react'
import { WithShowNotification } from 'store/actions/notificationsActions'
import { withShowNotification } from 'utils/notifications'

const UpdateQuoteFormComponent: React.FC<{
  quote: Quote
  onSubmitted: () => void
} & WithShowNotification> = ({ quote, onSubmitted, showNotification }) => {
  const [bypassUwgl, setBypassUwgl] = useState(false)
  const [updateQuote] = useUpdateQuoteBySchema()

  const performQuoteUpdate = (formData: Record<string, unknown>) => {
    const options = getUpdateQuoteSchemaOptions({
      memberId: quote.memberId!,
      quoteId: quote.id,
      schema: quote.schema,
      formData,
      bypassUnderwritingGuidelines: bypassUwgl,
    })
    updateQuote(options)
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

  return (
    <JsonSchemaForm
      schema={quote.schema}
      initialFormData={quote.schemaData}
      onSubmit={performQuoteUpdate}
      submitText={'Save'}
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

export const UpdateQuoteForm = withShowNotification(UpdateQuoteFormComponent)
