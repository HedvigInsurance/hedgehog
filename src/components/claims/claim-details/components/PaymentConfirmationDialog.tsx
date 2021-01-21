import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import { Market } from 'types/enums'
import { PaymentFormData } from './ClaimPayment'

import { Field, Form, Formik } from 'formik'
import React from 'react'
import * as yup from 'yup'

interface PaymentConfirmationDialogProps {
  onClose: () => void
  onSubmit: (claimVariables: object) => void
  payment: PaymentFormData
  claimId: string
  identified: boolean
  market: string | null
}

const CustomTextField = ({ field, form, ...props }) => {
  return <TextField {...field} {...props} />
}

const paymentConfirmValidationSchema = (amount: string) =>
  yup.object().shape({
    confirmation: yup.string().matches(new RegExp(`^${amount}$`)),
  })

interface ConfirmationData {
  confirmation: string
}

export const PaymentConfirmationDialog: React.SFC<PaymentConfirmationDialogProps> = ({
  onClose,
  onSubmit,
  payment,
  claimId,
  identified,
  market,
}) => {
  return (
    <Dialog open={true} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Payment Confirmation</DialogTitle>

      <DialogContent>
        {!identified && market === Market.Norway && (
          <DialogContentText>
            ⚠️ Please note that this member is not identified
          </DialogContentText>
        )}
        <br />
        <DialogContentText>
          Please enter "{payment.amount}" and submit to confirm payment.
          <br />
          Once confirmed, an amount of {payment.amount} will be paid out to
          support this claim.
        </DialogContentText>
        <Formik<ConfirmationData>
          initialValues={{ confirmation: '' }}
          onSubmit={(_, { resetForm }) => {
            onSubmit({
              variables: {
                id: claimId,
                payment: {
                  amount: {
                    amount: +payment.amount,
                    currency: 'SEK',
                  },
                  deductible: {
                    amount: +payment.deductible,
                    currency: 'SEK',
                  },
                  sanctionListSkipped: payment.overridden
                    ? payment.overridden
                    : false,
                  note: payment.note,
                  exGratia: payment.exGratia || false,
                  type: payment.type,
                },
              },
            })
            resetForm()
            onClose()
          }}
          validationSchema={paymentConfirmValidationSchema(payment.amount)}
        >
          {({ isValid }) => (
            <Form>
              <Field
                component={CustomTextField}
                autoFocus
                margin="dense"
                id="confirmation"
                name="confirmation"
                label="Confirmation"
                type="text"
                placeholder="Amount to be paid"
                fullWidth
              />
              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  disabled={!isValid}
                  variant="contained"
                >
                  Confirm Payment
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
