import { MenuItem, withStyles } from '@material-ui/core'
import { useAddAccountEntryToMemberMutation } from 'api/generated/graphql'
import { AddEntryInformation } from 'components/member/tabs/account-tab/AddEntryInformation'
import { FieldSelect } from 'components/shared/inputs/FieldSelect'
import { TextField as MuiTextField } from 'components/shared/inputs/TextField'
import { format, startOfDay } from 'date-fns'
import { Field, Form as FormikForm, Formik } from 'formik'
import { useContractMarketInfo } from 'graphql/use-get-member-contract-market-info'
import { Button } from 'hedvig-ui/button'
import { FormikDateTimePicker } from 'hedvig-ui/date-time-picker'
import React from 'react'
import styled from 'react-emotion'
import { WithShowNotification } from 'store/actions/notificationsActions'
import { withShowNotification } from 'utils/notifications'
import * as yup from 'yup'

const BottomRowWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  '> div:first-of-type': {
    flex: 1,
  },
})

const TextField = withStyles({
  root: {
    display: 'block',
    width: '100%',
  },
})(MuiTextField)

const Form = styled(FormikForm)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})

const getValidationSchema = () =>
  yup.object().shape({
    type: yup
      .string()
      .oneOf(['CAMPAIGN', 'SUBSCRIPTION', 'LOSS', 'CHARGE'])
      .required(),
    amount: yup.number().required(),
    reference: yup
      .string()
      .max(50)
      .required(),
    source: yup
      .string()
      .max(15)
      .required(),
    title: yup
      .string()
      .max(100)
      .nullable(true),
    comment: yup
      .string()
      .max(500)
      .nullable(true),
    fromDate: yup.date().min(startOfDay(new Date())),
  })

export const parseAmount = (amount: string) =>
  parseFloat(amount.replace(/\s+/g, ''))

const initialValues = {
  type: '',
  amount: '',
  reference: '',
  source: '',
  title: '',
  comment: '',
  fromDate: new Date(),
}

const AddEntryFormComponent: React.FC<{
  memberId: string
} & WithShowNotification> = ({ memberId, showNotification }) => {
  const [contractMarketInfo] = useContractMarketInfo(memberId)
  const preferredCurrency = contractMarketInfo?.preferredCurrency || 'SEK'
  const [addAccountEntry] = useAddAccountEntryToMemberMutation()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema()}
      onSubmit={(formData: any, { resetForm }) => {
        if (!window.confirm('Are you sure you want to add this entry?')) {
          return
        }

        addAccountEntry({
          variables: {
            memberId,
            accountEntry: {
              type: formData.type,
              amount: {
                amount: parseAmount(formData.amount),
                currency: preferredCurrency,
              },
              fromDate: format(formData.fromDate, 'yyyy-MM-dd'),
              reference: formData.reference,
              source: formData.source,
              title: formData.title,
              comment: formData.comment,
            },
          },
        })
          .then(() => {
            showNotification({
              message: 'Account entry added.',
              header: 'Success',
              type: 'olive',
            })
            resetForm()
          })
          .catch((error) => {
            showNotification({
              message: error.message,
              header: 'Error',
              type: 'red',
            })

            throw error
          })
      }}
    >
      {({ values, isValid }) => (
        <Form>
          <label htmlFor="type">Entry Type</label>
          <Field component={FieldSelect} name="type">
            <MenuItem value="CAMPAIGN">
              <strong>Campaign</strong>: The member owes or will owe us money,
              but we want to pay for it with marketing budget
            </MenuItem>
            <MenuItem value="SUBSCRIPTION">
              <strong>Subscription</strong>: The member owes us more money (e.g.
              object insurance, travel insurance, incorrectly fetched premiums)
            </MenuItem>
            <MenuItem value="LOSS">
              <strong>Loss</strong>: The member owes us money we will never get
              (e.g. the member terminated its insurance or we had a too early
              start date)
            </MenuItem>
            <MenuItem value="CORRECTION">
              <strong>Correction</strong>: A calculation is incorrect (should
              hopefully never have to be used)
            </MenuItem>
          </Field>
          <Field
            component={TextField}
            label="Amount"
            type="number"
            name="amount"
          />
          <Field
            component={TextField}
            label="Source"
            name="source"
            placeholder="(Required) Entry source, e.g. travel insurance, object insurance, marketing, IEX"
          />
          <Field
            component={TextField}
            label="Reference"
            name="reference"
            placeholder="(Required) Reference of source, e.g. object insurance id, campaign code, member ID"
          />
          <Field
            component={TextField}
            label="Title"
            name="title"
            placeholder="(Optional) If this is to be shown in the app at a later point, this is the title of the entry"
          />
          <Field
            component={TextField}
            label="Comment"
            name="comment"
            placeholder="(Optional) Notes on what happened"
          />
          <label htmlFor="fromDate">From Date</label>
          <Field
            component={FormikDateTimePicker}
            type="date"
            name="fromDate"
            minDate={new Date()}
          />
          <BottomRowWrapper>
            {isValid && (
              <AddEntryInformation
                amount={{
                  amount: values.amount,
                  currency: preferredCurrency,
                }}
                memberId={memberId}
              />
            )}
            <Button
              type="submit"
              variation="primary"
              color="primary"
              disabled={!isValid}
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              Add entry
            </Button>
          </BottomRowWrapper>
        </Form>
      )}
    </Formik>
  )
}

export const AddEntryForm = withShowNotification(AddEntryFormComponent)
