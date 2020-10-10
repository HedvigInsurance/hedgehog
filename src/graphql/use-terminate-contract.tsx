import { MutationFunctionOptions } from '@apollo/react-common'
import {
  Contract,
  TerminateContractMutation,
  TerminateContractMutationHookResult,
  TerminateContractMutationVariables,
  TerminationReason,
  useTerminateContractMutation,
} from 'api/generated/graphql'
import { format } from 'date-fns'
import { withDelayedRefetchContracts } from './use-contracts'

export const useTerminateContract = (
  contract: Contract,
): TerminateContractMutationHookResult => {
  return withDelayedRefetchContracts<
    TerminateContractMutation,
    TerminateContractMutationVariables
  >(useTerminateContractMutation(), contract)
}

export const terminateContractOptions = (
  contract: Contract,
  terminationDate: Date,
  terminationReason: TerminationReason,
  comment?: string,
): MutationFunctionOptions<
  TerminateContractMutation,
  TerminateContractMutationVariables
> => {
  return {
    variables: {
      contractId: contract.id,
      request: {
        terminationDate: format(terminationDate, 'yyyy-MM-dd'),
        terminationReason,
        comment,
      },
    },
  }
}
