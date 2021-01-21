import {
  PAYOUT_REQUEST_ERROR,
  PAYOUT_REQUEST_SUCCESS,
} from '../constants/payout'

export const payoutRequestSuccess = () => ({
  type: PAYOUT_REQUEST_SUCCESS,
})

export const payoutRequestError = (error) => ({
  type: PAYOUT_REQUEST_ERROR,
  error,
})
