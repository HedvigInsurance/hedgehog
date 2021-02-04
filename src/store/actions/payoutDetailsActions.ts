import { PayoutFormData } from 'components/payouts/payout-details'
import {
  PAYOUT_REQUEST_ERROR,
  PAYOUT_REQUEST_SUCCESS,
  PAYOUT_REQUESTING,
} from '../constants/payout'

export const payoutRequest = (
  payoutData: PayoutFormData,
  memberId: string,
) => ({
  type: PAYOUT_REQUESTING,
  data: payoutData,
  memberId,
})

export const payoutRequestSuccess = () => ({
  type: PAYOUT_REQUEST_SUCCESS,
})

export const payoutRequestError = (error) => ({
  type: PAYOUT_REQUEST_ERROR,
  error,
})
