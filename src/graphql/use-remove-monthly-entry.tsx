import { MutationFunctionOptions } from '@apollo/react-common'
import {
  GetAccountDocument,
  RemoveMonthlyEntryMutation,
  RemoveMonthlyEntryMutationVariables,
  useRemoveMonthlyEntryMutation,
} from 'api/generated/graphql'

export const useRemoveMonthlyEntry = () => useRemoveMonthlyEntryMutation()

export const getRemoveMonthlyEntryOptions = (
  memberId: string,
  monthlyEntryId: string,
): MutationFunctionOptions<
  RemoveMonthlyEntryMutation,
  RemoveMonthlyEntryMutationVariables
> => {
  return {
    variables: {
      id: monthlyEntryId,
    },
    refetchQueries: [
      {
        query: GetAccountDocument,
        variables: { memberId },
      },
    ],
  }
}
