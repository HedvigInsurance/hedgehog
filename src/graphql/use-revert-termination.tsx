import { MutationFunctionOptions } from '@apollo/react-common'
import {
  Contract,
  RevertTerminationMutation,
  RevertTerminationMutationHookResult,
  RevertTerminationMutationVariables,
  useRevertTerminationMutation,
} from 'api/generated/graphql'
import { withDelayedRefetchContracts } from './use-contracts'

export const useRevertTermination = (
  contract: Contract,
): RevertTerminationMutationHookResult => {
  return withDelayedRefetchContracts<
    RevertTerminationMutation,
    RevertTerminationMutationVariables
  >(useRevertTerminationMutation(), contract)
}

export const revertTerminationOptions = (
  contract: Contract,
): MutationFunctionOptions<
  RevertTerminationMutation,
  RevertTerminationMutationVariables
> => {
  return {
    variables: {
      contractId: contract.id,
    },
  }
}
