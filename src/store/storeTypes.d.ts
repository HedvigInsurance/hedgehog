import { AuthState } from 'store/actions/auth'

export interface BackofficeStore {
  auth: {
    state: AuthState
    scopes: ReadonlyArray<string>
    id?: string
    email?: string
  }
  login: any
  client: any
  payoutDetails: any
  notifications: any
}

export type Gender = 'MALE' | 'FEMALE' | 'OTHER'
