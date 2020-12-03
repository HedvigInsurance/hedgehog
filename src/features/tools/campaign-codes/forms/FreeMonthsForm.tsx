import { AssignVoucherFreeMonths } from 'api/generated/graphql'
import { ClearableDropdown as Dropdown } from 'features/tools/campaign-codes/components/ClearableDropdown'
import { Centered, Row } from 'features/tools/campaign-codes/styles'
import { mapCampaignOwners } from 'features/tools/campaign-codes/utils'
import {
  addPartnerFreeMonthsCodeOptions,
  useAddPartnerFreeMonthsCode,
} from 'graphql/use-add-partner-free-months-code'
import { usePartnerCampaignOwners } from 'graphql/use-get-partner-campaign-owners'
import { Button } from 'hedvig-ui/button'
import { DateTimePicker } from 'hedvig-ui/date-time-picker'
import { Spacing } from 'hedvig-ui/spacing'
import React from 'react'
import { Input } from 'semantic-ui-react'
import { WithShowNotification } from 'store/actions/notificationsActions'
import { numberOfMonthsOptions } from 'utils/campaignCodes'
import { withShowNotification } from 'utils/notifications'

const initialFormData: AssignVoucherFreeMonths = {
  code: '',
  partnerId: '',
  numberOfFreeMonths: 1,
  validFrom: null,
  validUntil: null,
}

const formIsValid = (formData: AssignVoucherFreeMonths) => {
  return formData.partnerId !== '' && formData.code !== ''
}

const FreeMonths: React.FC<{} & WithShowNotification> = ({
  showNotification,
}) => {
  const [formData, setFormData] = React.useState<AssignVoucherFreeMonths>(
    initialFormData,
  )

  const [partnerCampaignOwners] = usePartnerCampaignOwners()
  const [setPartnerFreeMonths, { loading }] = useAddPartnerFreeMonthsCode()

  const reset = () => setFormData(initialFormData)

  return (
    <>
      <label>Partner</label>
      <Dropdown
        value={formData.partnerId}
        disabled={loading}
        placeholder={'Partner'}
        onChange={(_, { value: partnerId }) =>
          setFormData({ ...formData, partnerId: partnerId as string })
        }
        onClear={() => setFormData({ ...formData, partnerId: '' })}
        options={mapCampaignOwners(partnerCampaignOwners)}
      />
      <Spacing top={'small'} />
      <label>Code</label>
      <Input
        value={formData.code}
        fluid
        disabled={loading}
        onChange={({ currentTarget: { value: code } }) =>
          setFormData({ ...formData, code })
        }
        placeholder="Code"
      />
      <Spacing top={'small'} />
      <label>Valid period</label>
      <Row>
        <div style={{ float: 'left' }}>
          <DateTimePicker
            fullWidth
            disabled={loading}
            date={formData.validFrom!}
            placeholder={'Valid from'}
            setDate={(validFrom) => setFormData({ ...formData, validFrom })}
          />
        </div>
        <div style={{ float: 'right' }}>
          <DateTimePicker
            fullWidth
            disabled={loading}
            date={formData.validUntil!}
            placeholder={'Valid until'}
            setDate={(validUntil) => setFormData({ ...formData, validUntil })}
          />
        </div>
      </Row>
      <Spacing top={'small'} />
      <label>Months</label>
      <Dropdown
        value={formData.numberOfFreeMonths}
        onChange={(_, { value: numberOfFreeMonths }) => {
          setFormData({
            ...formData,
            numberOfFreeMonths: numberOfFreeMonths as number,
          })
        }}
        placeholder="Months"
        disabled={loading}
        options={numberOfMonthsOptions}
      />
      <Spacing top={'small'} />
      <Centered>
        <Button
          variation="primary"
          loading={loading}
          disabled={loading || !formIsValid(formData)}
          onClick={() => {
            if (
              !window.confirm(`Create new campaign code "${formData.code}"?`)
            ) {
              return
            }
            setPartnerFreeMonths(addPartnerFreeMonthsCodeOptions(formData))
              .then(() => {
                reset()
                showNotification({
                  type: 'olive',
                  header: 'Success',
                  message: `Successfully created a new free month campaign for partner ${formData.partnerId}`,
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
          Create New Campaign
        </Button>
      </Centered>
    </>
  )
}

export const FreeMonthsForm = withShowNotification(FreeMonths)
