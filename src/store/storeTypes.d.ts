import { AuthState } from 'store/actions/auth'
import { ClaimsStore } from './types/claimsTypes'

export interface BackofficeStore {
  auth: {
    state: AuthState
    scopes: ReadonlyArray<string>
    id?: string
    email?: string
  }
  login: any
  client: any
  poll: any
  claims: ClaimsStore
  claimDetails: any
  payoutDetails: any
  notifications: any
  memberInsurance: any
}

export type Gender = 'MALE' | 'FEMALE' | 'OTHER'
