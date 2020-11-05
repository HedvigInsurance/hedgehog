import { useUnsignMemberMutation } from 'api/generated/graphql'
import { Button } from 'hedvig-ui/button'
import { Input } from 'hedvig-ui/input'
import { Spacing } from 'hedvig-ui/spacing'
import { MainHeadline } from 'hedvig-ui/typography'
import React from 'react'
import { WithShowNotification } from 'store/actions/notificationsActions'
import { withShowNotification } from 'utils/notifications'

const UnsignMemberToolComponent: React.FC<{} & WithShowNotification> = ({
  showNotification,
}) => {
  const [ssn, setSsn] = React.useState('')
  const [useUnsignMember, { loading }] = useUnsignMemberMutation()

  return (
    <>
      <MainHeadline>Unsign member</MainHeadline>
      <Input
        value={ssn}
        onChange={(_e, { value }) => {
          setSsn(value)
        }}
        placeholder="Social Security Number"
      />
      <Spacing top={'small'} />
      <Button
        variation="primary"
        disabled={loading || ssn === ''}
        onClick={() => {
          if (
            !window.confirm(
              `Are you sure you want to unsign member with SSN ${ssn}?`,
            )
          ) {
            return
          }
          useUnsignMember({
            variables: {
              ssn,
            },
          })
            .then(() => {
              showNotification({
                type: 'olive',
                header: 'Success',
                message: `Successfully unsigned member`,
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
        }}
      >
        Unsign
      </Button>
    </>
  )
}

export const UnsignMemberTool = withShowNotification(UnsignMemberToolComponent)
