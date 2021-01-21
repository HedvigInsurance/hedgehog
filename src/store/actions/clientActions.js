import { CLIENT_SET, CLIENT_UNSET } from '../constants/login'

export const setClient = (credentials) => ({
  type: CLIENT_SET,
  credentials,
})

export const unsetClient = () => ({
  type: CLIENT_UNSET,
})
