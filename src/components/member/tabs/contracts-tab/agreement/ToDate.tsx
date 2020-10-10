import { Contract, GenericAgreement } from 'api/generated/graphql'
import { format } from 'date-fns'
import {
  changeToDateOptions,
  useChangeToDate,
} from 'graphql/use-change-to-date-for-agreement'
import { Button, ButtonsGroup } from 'hedvig-ui/button'
import { DateTimePicker } from 'hedvig-ui/date-time-picker'
import { Spacing } from 'hedvig-ui/spacing'
import {
  FourthLevelHeadline,
  Paragraph,
  ThirdLevelHeadline,
} from 'hedvig-ui/typography'
import React from 'react'
import { Notification } from 'store/actions/notificationsActions'

const initialToDate = (agreement: GenericAgreement): Date =>
  agreement.toDate ? new Date(agreement.toDate) : new Date()

export const ToDate: React.FunctionComponent<{
  agreement: GenericAgreement
  contract: Contract
  showNotification: (data: Notification) => void
}> = ({ agreement, contract, showNotification }) => {
  const [datePickerEnabled, setDatePickerEnabled] = React.useState(false)
  const [toDate, setToDate] = React.useState(initialToDate(agreement))
  const [changeToDate] = useChangeToDate(contract)
  const reset = () => {
    setToDate(initialToDate(agreement))
    setDatePickerEnabled(false)
  }
  React.useEffect(() => {
    reset()
  }, [agreement])

  return (
    <>
      <ThirdLevelHeadline>To Date</ThirdLevelHeadline>
      {!datePickerEnabled && (
        <Spacing bottom width={'auto'}>
          <FourthLevelHeadline>
            {agreement.toDate !== null
              ? format(new Date(agreement.toDate), 'yyyy-MM-dd')
              : 'Active'}
          </FourthLevelHeadline>
        </Spacing>
      )}
      {!datePickerEnabled && agreement.toDate && !contract.isTerminated && (
        <Button variation="primary" onClick={() => setDatePickerEnabled(true)}>
          Edit
        </Button>
      )}
      {!datePickerEnabled && contract.isTerminated && (
        <Paragraph>Terminated</Paragraph>
      )}
      {datePickerEnabled && (
        <>
          <Spacing bottom width={'auto'}>
            <DateTimePicker date={toDate} setDate={setToDate} />
          </Spacing>
          <ButtonsGroup>
            <Button
              variation="secondary"
              onClick={() => {
                const formattedToDate = format(toDate, 'yyyy-MM-dd')
                if (
                  !window.confirm(`Change the to date to ${formattedToDate}?`)
                ) {
                  return
                }
                changeToDate(changeToDateOptions(agreement, toDate))
                  .then(() => {
                    showNotification({
                      type: 'olive',
                      header: 'Success',
                      message: `Successfully changed the to date to ${formattedToDate}`,
                    })
                    reset()
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
              Confirm
            </Button>
            <Button onClick={() => reset()}>Cancel</Button>
          </ButtonsGroup>
        </>
      )}
    </>
  )
}
