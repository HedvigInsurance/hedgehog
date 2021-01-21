import {
  Button as MuiButton,
  Checkbox as MuiCheckbox,
  FormControlLabel as MuiFormControlLabel,
  MenuItem as MuiMenuItem,
  withStyles,
} from '@material-ui/core'
import { SanctionStatus } from 'api/generated/graphql'

import { ActionMap, Container } from 'constate'
import { Field, FieldProps, Form, Formik, validateYupSchema } from 'formik'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import styled from 'react-emotion'
import { sleep } from 'utils/sleep'
import * as yup from 'yup'
import { FieldSelect } from '../../../shared/inputs/FieldSelect'
import { TextField } from '../../../shared/inputs/TextField'
import {
  MutationFeedbackBlock,
  MutationStatus,
} from '../../../shared/MutationFeedbackBlock'
import { PaymentConfirmationDialog } from './PaymentConfirmationDialog'

const CREATE_PAYMENT_MUTATION = gql`
  mutation CreatePayment($id: ID!, $payment: ClaimPaymentInput!) {
    createClaimPayment(id: $id, payment: $payment) {
      payments {
        id
        amount
        deductible
        note
        type
        timestamp
        exGratia
        transaction {
          status
        }
        status
      }
      events {
        text
        date
      }
    }
  }
`

interface Props {
  sanctionStatus: SanctionStatus
  claimId: string
  refetchPage: () => Promise<any>
  identified: boolean
  market: string | null
}

interface State {
  initiatedPayment: PaymentFormData | null
  paymentStatus: MutationStatus
}

interface Actions {
  initiatePayment: (payment: PaymentFormData) => void
  closeInitiatedPayment: () => void
  setPaymentStatus: (paymentStatus: MutationStatus) => void
}

const actions: ActionMap<State, Actions> = {
  initiatePayment: (payment) => () => ({
    initiatedPayment: payment,
  }),
  closeInitiatedPayment: () => () => ({
    initiatedPayment: null,
  }),
  setPaymentStatus: (paymentStatus: MutationStatus) => () => ({
    paymentStatus,
  }),
}

export interface PaymentFormData {
  amount: string
  deductible: string
  note: string
  exGratia?: boolean
  type: string
  overridden?: boolean
}

const PaymentForm = styled(Form)({
  marginTop: '1rem',
})

const SubmitButton = withStyles({
  root: {
    marginTop: '1rem',
    display: 'block',
  },
})(MuiButton)

const Checkbox: React.SFC<FieldProps> = ({
  field: { onChange, onBlur, name, value },
}) => (
  <MuiCheckbox
    onChange={onChange}
    onBlur={onBlur}
    name={name}
    checked={value || false}
    color="primary"
  />
)

const getPaymentValidationSchema = (isPotentiallySanctioned: boolean) =>
  yup.object().shape({
    ...(isPotentiallySanctioned && {
      overridden: yup
        .boolean()
        .required()
        .test(
          'overridden',
          'Override saction list checkbox isn’t checked.',
          (value) => value === true,
        ),
    }),
    amount: yup.string().required(),
    note: yup.string().required(),
    exGratia: yup.boolean(),
    type: yup
      .string()
      .oneOf(['Manual', 'Automatic'])
      .required(),
  })

export const ClaimPayment: React.SFC<Props> = ({
  sanctionStatus,
  claimId,
  refetchPage,
  identified,
  market,
}) => {
  const isPotentiallySanctioned =
    sanctionStatus === 'Undetermined' || sanctionStatus === 'PartialHit'

  return (
    <Container<State, Actions>
      initialState={{
        initiatedPayment: null,
        paymentStatus: '',
      }}
      actions={actions}
    >
      {({
        initiatePayment,
        closeInitiatedPayment,
        initiatedPayment,
        paymentStatus,
        setPaymentStatus,
      }) => (
        <Mutation
          mutation={CREATE_PAYMENT_MUTATION}
          onCompleted={() => {
            closeInitiatedPayment()
            setPaymentStatus('COMPLETED')
          }}
          onError={() => {
            closeInitiatedPayment()
            setPaymentStatus('FAILED')
          }}
        >
          {(createPayment) => (
            <Formik<PaymentFormData>
              initialValues={{
                type: 'Manual',
                amount: '',
                deductible: '',
                note: '',
                overridden: false,
              }}
              onSubmit={(values, {}) => {
                initiatePayment(values)
              }}
              validationSchema={getPaymentValidationSchema(
                isPotentiallySanctioned,
              )}
              validate={(values) => {
                try {
                  validateYupSchema<PaymentFormData>(
                    values,
                    getPaymentValidationSchema(isPotentiallySanctioned),
                    false,
                  )
                } catch (error) {
                  throw new Error(
                    'An error occured with the validation ' + error,
                  )
                }
              }}
            >
              {({ resetForm, isValid }) => (
                <>
                  <PaymentForm>
                    <Field
                      component={TextField}
                      placeholder="Payment amount"
                      name="amount"
                    />
                    <Field
                      component={TextField}
                      placeholder="Deductible"
                      name="deductible"
                    />
                    <Field
                      component={TextField}
                      placeholder="Note"
                      name="note"
                    />
                    <MuiFormControlLabel
                      label="Ex Gratia?"
                      control={<Field component={Checkbox} name="exGratia" />}
                    />
                    <Field component={FieldSelect} name="type">
                      <MuiMenuItem value="Manual">Manual</MuiMenuItem>
                      <MuiMenuItem value="Automatic">Automatic</MuiMenuItem>
                    </Field>

                    {isPotentiallySanctioned && (
                      <MuiFormControlLabel
                        label="Override sanction list result (I promise that I have manually checked the list)"
                        control={
                          <Field component={Checkbox} name="overridden" />
                        }
                      />
                    )}

                    <SubmitButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={!isValid}
                    >
                      Create payment
                    </SubmitButton>
                  </PaymentForm>

                  {initiatedPayment && (
                    <PaymentConfirmationDialog
                      onClose={() => {
                        closeInitiatedPayment()
                        resetForm()
                      }}
                      onSubmit={async (graphqlArgs) => {
                        await createPayment(graphqlArgs)
                        await sleep(1000)
                        await refetchPage()
                      }}
                      payment={initiatedPayment}
                      claimId={claimId}
                      identified={identified}
                      market={market}
                    />
                  )}

                  {!!paymentStatus && (
                    <MutationFeedbackBlock
                      status={paymentStatus}
                      messages={{
                        COMPLETED: 'Payment was completed',
                        FAILED:
                          'Payment failed. Please contact tech support if failure is persistent.',
                      }}
                      onTimeout={() => setPaymentStatus('')}
                    />
                  )}
                </>
              )}
            </Formik>
          )}
        </Mutation>
      )}
    </Container>
  )
}
