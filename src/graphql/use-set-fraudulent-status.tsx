import { MutationFunctionOptions } from '@apollo/react-common'
import {
  GetMemberInfoDocument,
  MemberFraudulentStatusInput,
  SetFraudulentStatusMutation,
  SetFraudulentStatusMutationHookResult,
  SetFraudulentStatusMutationVariables,
  useSetFraudulentStatusMutation,
} from 'api/generated/graphql'

export const useSetFraudulentStatus = (): SetFraudulentStatusMutationHookResult => {
  return useSetFraudulentStatusMutation()
}

export const getSetFraudulentStatusOptions = (
  memberId: string,
  request: MemberFraudulentStatusInput,
): MutationFunctionOptions<
  SetFraudulentStatusMutation,
  SetFraudulentStatusMutationVariables
> => {
  return {
    variables: {
      memberId,
      request,
    },
    refetchQueries: [
      {
        query: GetMemberInfoDocument,
        variables: {
          memberId,
        },
      },
    ],
  }
}
