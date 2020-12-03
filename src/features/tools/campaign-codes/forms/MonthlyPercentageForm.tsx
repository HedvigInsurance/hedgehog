import { AssignVoucherPercentageDiscount } from 'api/generated/graphql'
import { ClearableDropdown as Dropdown } from 'features/tools/campaign-codes/components/ClearableDropdown'
import { Centered, Row } from 'features/tools/campaign-codes/styles'
import { mapCampaignOwners } from 'features/tools/campaign-codes/utils'
import {
  addPartnerPercentageDiscountCodeOptions,
  useAddPartnerPercentageDiscountCode,
} from 'graphql/use-add-partner-percentage-discount-code'
import { usePartnerCampaignOwners } from 'graphql/use-get-partner-campaign-owners'
import { Button } from 'hedvig-ui/button'
import { DateTimePicker } from 'hedvig-ui/date-time-picker'
import { Spacing } from 'hedvig-ui/spacing'
import React from 'react'
import { Input } from 'semantic-ui-react'
import { WithShowNotification } from 'store/actions/notificationsActions'
import {
  numberOfMonthsOptions,
  percentageDiscountOptions,
} from 'utils/campaignCodes'
import { withShowNotification } from 'utils/notifications'

const initialFormData: AssignVoucherPercentageDiscount = {
  code: '',
  partnerId: '',
  numberOfMonths: 1,
  percentageDiscount: 5,
  validFrom: null,
  validUntil: null,
}

const formIsValid = (formData: AssignVoucherPercentageDiscount) => {
  return formData.partnerId !== '' && formData.code !== ''
}

const MonthlyPercentage: React.FC<{} & WithShowNotification> = ({
  showNotification,
}) => {
  const [formData, setFormData] = React.useState<
    AssignVoucherPercentageDiscount
  >(initialFormData)

  const [partnerCampaignOwners] = usePartnerCampaignOwners()

  const [
    setPartnerPercentageDiscount,
    { loading },
  ] = useAddPartnerPercentageDiscountCode()

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
      <label>Percentage discount</label>
      <Dropdown
        value={formData.percentageDiscount}
        disabled={loading}
        placeholder={'Discount %'}
        onChange={(_, { value: percentageDiscount }) =>
          setFormData({
            ...formData,
            percentageDiscount: percentageDiscount as number,
          })
        }
        options={percentageDiscountOptions}
      />
      <Spacing top={'small'} />
      <label>Months</label>
      <Dropdown
        value={formData.numberOfMonths}
        onChange={(_, { value: numberOfMonths }) => {
          setFormData({
            ...formData,
            numberOfMonths: numberOfMonths as number,
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
            setPartnerPercentageDiscount(
              addPartnerPercentageDiscountCodeOptions(formData),
            )
              .then(() => {
                reset()
                showNotification({
                  type: 'olive',
                  header: 'Success',
                  message: `Successfully created a new percentage campaign for partner ${formData.partnerId}`,
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

export const MonthlyPercentageForm = withShowNotification(MonthlyPercentage)
