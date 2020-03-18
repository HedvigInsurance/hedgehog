import { useAddNorwegainPostalCodesMutation } from 'api/generated/graphql'
import { Button } from 'hedvig-ui/button'
import { Spacing } from 'hedvig-ui/spacing'
import { TextArea } from 'hedvig-ui/text-area'
import * as React from 'react'
import { Notification } from 'store/actions/notificationsActions'

interface PostalCodesEditorProps {
  showNotification: (data: Notification) => void
}

export const PostalCodesEditor: React.FunctionComponent<PostalCodesEditorProps> = ({
  showNotification,
}) => {
  const [postalCodesString, setPostalCodesString] = React.useState<string>('')
  const [
    addNorwegianPostalCodes,
    { loading },
  ] = useAddNorwegainPostalCodesMutation()

  return (
    <Spacing top>
      <TextArea
        placeholder={
          'Add postal codes columns from excel ("Postnummer", "Poststed", "Municipality name", "Disposable income" and "Centrality group")'
        }
        setText={setPostalCodesString}
      />
      <Spacing top>
        <Button
          fullWidth
          variation={'secondary'}
          disabled={loading}
          onClick={() => {
            if (
              window.confirm('Are you sure you want to add the postal codes?')
            ) {
              addNorwegianPostalCodes({
                variables: {
                  postalCodesString,
                },
              })
                .then(() => {
                  showNotification({
                    type: 'olive',
                    header: 'Success',
                    message: 'Successfully added Norwegian Postal Codes',
                  })
                })
                .catch((error) => {
                  showNotification({
                    type: 'red',
                    header: 'Error',
                    message: error.message,
                  })
                  throw error
                })
            }
          }}
        >
          Add Norwegian Postal Codes
        </Button>
      </Spacing>
    </Spacing>
  )
}
