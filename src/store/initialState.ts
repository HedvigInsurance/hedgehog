import { AuthState } from 'store/actions/auth'
import { BackofficeStore } from './storeTypes'
import { PayoutRequestResult } from './types/payoutTypes'

const initialState: BackofficeStore = {
  auth: {
    state: AuthState.UNKNOWN,
    scopes: [],
  },
  login: {
    requesting: false,
  },
  client: {},
  payoutDetails: {
    data: null,
    requesting: false,
    requestResult: PayoutRequestResult.READY,
  },
  notifications: [],
}

export default initialState
