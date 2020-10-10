import { MutationFunctionOptions } from '@apollo/react-common'
import {
  AddAgreementFromQuoteMutation,
  AddAgreementFromQuoteMutationHookResult,
  AddAgreementFromQuoteMutationVariables,
  Contract,
  GetQuotesDocument,
  Quote,
  useAddAgreementFromQuoteMutation,
} from 'api/generated/graphql'
import { format } from 'date-fns'

export const useAddAgreementFromQuote = (): AddAgreementFromQuoteMutationHookResult =>
  useAddAgreementFromQuoteMutation()

export const addAgreementFromQuoteOptions = (
  contract: Contract,
  activeFrom: Date | null,
  activeTo: Date | null,
  previousAgreementActiveTo: Date | null,
  quote: Quote,
): MutationFunctionOptions<
  AddAgreementFromQuoteMutation,
  AddAgreementFromQuoteMutationVariables
> => {
  return {
    variables: {
      id: quote.id,
      activeFrom: activeFrom ? format(activeFrom, 'yyyy-MM-dd') : null,
      activeTo: activeTo ? format(activeTo, 'yyy-MM-dd') : null,
      contractId: contract.id,
      previousAgreementActiveTo: previousAgreementActiveTo
        ? format(previousAgreementActiveTo, 'yyy-MM-dd')
        : null,
    },
    refetchQueries: () => [
      {
        query: GetQuotesDocument,
        variables: { memberId: contract.holderMemberId },
      },
    ],
  }
}
