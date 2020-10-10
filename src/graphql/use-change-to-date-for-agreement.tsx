import { MutationFunctionOptions } from '@apollo/react-common'
import {
  ChangeToDateMutation,
  ChangeToDateMutationHookResult,
  ChangeToDateMutationVariables,
  Contract,
  GenericAgreement,
  useChangeToDateMutation,
} from 'api/generated/graphql'
import { format } from 'date-fns'
import { withDelayedRefetchContracts } from './use-contracts'

export const useChangeToDate = (
  contract: Contract,
): ChangeToDateMutationHookResult => {
  return withDelayedRefetchContracts<
    ChangeToDateMutation,
    ChangeToDateMutationVariables
  >(useChangeToDateMutation(), contract)
}

export const changeToDateOptions = (
  agreement: GenericAgreement,
  newToDate: Date,
): MutationFunctionOptions<
  ChangeToDateMutation,
  ChangeToDateMutationVariables
> => {
  return {
    variables: {
      agreementId: agreement.id,
      request: {
        newToDate: format(newToDate, 'yyyy-MM-dd'),
      },
    },
  }
}
