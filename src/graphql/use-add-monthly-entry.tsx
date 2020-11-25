import { MutationFunctionOptions } from '@apollo/react-common'
import {
  AddMonthlyEntryMutation,
  AddMonthlyEntryMutationVariables,
  GetAccountDocument,
  MonthlyEntryInput,
  useAddMonthlyEntryMutation,
} from 'api/generated/graphql'

export const useAddMonthlyEntry = () => useAddMonthlyEntryMutation()

export const getAddMonthlyEntryOptions = (
  memberId: string,
  monthlyEntryInput: MonthlyEntryInput,
): MutationFunctionOptions<
  AddMonthlyEntryMutation,
  AddMonthlyEntryMutationVariables
> => {
  return {
    variables: {
      memberId,
      input: monthlyEntryInput,
    },
    refetchQueries: [
      {
        query: GetAccountDocument,
        variables: { memberId },
      },
    ],
  }
}
