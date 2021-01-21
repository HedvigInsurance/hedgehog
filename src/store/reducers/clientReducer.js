import { CLIENT_CHECK_AUTH, CLIENT_SET, CLIENT_UNSET } from '../constants/login'
import initialState from '../initialState'

export default function clientReducer(state = initialState.client, action) {
  switch (action.type) {
    case CLIENT_SET:
      return {
        ...action.credentials,
      }

    case CLIENT_UNSET:
      return {}

    case CLIENT_CHECK_AUTH:
      return state

    default:
      return state
  }
}
