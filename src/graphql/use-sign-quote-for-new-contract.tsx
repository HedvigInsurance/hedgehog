import { MutationFunctionOptions } from '@apollo/react-common'
import {
  GetContractsDocument,
  GetQuotesDocument,
  SignQuoteForNewContractMutation,
  SignQuoteForNewContractMutationHookResult,
  SignQuoteForNewContractMutationVariables,
  useSignQuoteForNewContractMutation,
} from 'api/generated/graphql'
import { format } from 'date-fns'

export const useSignQuoteForNewContract = (): SignQuoteForNewContractMutationHookResult =>
  useSignQuoteForNewContractMutation()

export const getSignQuoteForNewContractOptions = (
  quoteId: string,
  activationDate: Date,
  memberId: string,
): MutationFunctionOptions<
  SignQuoteForNewContractMutation,
  SignQuoteForNewContractMutationVariables
> => {
  return {
    variables: {
      quoteId,
      activationDate: format(activationDate, 'yyyy-MM-dd'),
    },
    refetchQueries: () => [
      {
        query: GetQuotesDocument,
        variables: { memberId },
      },
      {
        query: GetContractsDocument,
        variables: { memberId },
      },
    ],
  }
}
