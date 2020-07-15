import { useManualRedeemCampaignMutation } from 'api/generated/graphql'
import { Button } from 'hedvig-ui/button'
import { DateTimePicker } from 'hedvig-ui/date-time-picker'
import { Input } from 'hedvig-ui/input'
import React from 'react'
import styled from 'react-emotion'
import { Message } from 'semantic-ui-react'

export const Group = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  '*:not(:last-child)': {
    marginRight: '0.5rem',
  },
  '*:not(:first-child)': {
    marginLeft: '0.5rem',
  },
})

export const CampaignCodeInput: React.FunctionComponent<{
  memberId: string
}> = ({ memberId }) => {
  const [campaignCode, setCampaignCode] = React.useState('')
  const [success, setSuccess] = React.useState<boolean | null>(null)
  const [activationDate, setActivationDate] = React.useState<Date | null>(null)
  const [
    manualRedeemCampaign,
    { loading, error },
  ] = useManualRedeemCampaignMutation()

  const getStatusMessage = () => {
    if (success) {
      return (
        <Message
          success
          style={{ width: '100%' }}
          header={`Campaign code ${campaignCode.toUpperCase()} redeemed`}
        />
      )
    } else {
      return (
        <Message
          error
          style={{ width: '100%' }}
          header={`Could not redeem campaign code ${campaignCode.toUpperCase()}`}
        />
      )
    }
  }

  return (
    <>
      <Group>
        <Input
          placeholder={'Campaign code'}
          value={campaignCode}
          fullWidth
          onChange={(_e, { value }) => {
            setCampaignCode(value)
            setSuccess(null)
          }}
        />
        {activationDate ? (
          <>
            <DateTimePicker
              date={activationDate ?? new Date()}
              setDate={setActivationDate}
            />
            <Button
              variation="primary"
              style={{ width: '15%' }}
              onClick={() => setActivationDate(null)}
            >
              Remove
            </Button>
          </>
        ) : (
          <Button
            variation="primary"
            style={{ width: '30%' }}
            onClick={() => setActivationDate(new Date())}
          >
            Add activation date
          </Button>
        )}
      </Group>
      <Group style={{ marginTop: '1.0rem' }}>
        <Button
          variation="primary"
          fullWidth
          disabled={campaignCode === '' || !!error}
          loading={loading}
          onClick={() => {
            manualRedeemCampaign({
              variables: {
                memberId,
                request: { campaignCode, activationDate },
              },
              refetchQueries: () => ['GetReferralInformation'],
            })
              .then(() => {
                setCampaignCode('')
                setSuccess(true)
              })
              .catch(() => {
                setSuccess(false)
              })
          }}
        >
          Redeem
        </Button>
      </Group>
      {success !== null && getStatusMessage()}
    </>
  )
}
