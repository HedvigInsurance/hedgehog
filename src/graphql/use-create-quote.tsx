import { MutationFunctionOptions } from '@apollo/react-common'
import {
  Contract,
  CreateQuoteFromAgreementMutation,
  CreateQuoteFromAgreementMutationHookResult,
  CreateQuoteFromAgreementMutationVariables,
  GenericAgreement,
  GetContractsDocument,
  GetQuotesDocument,
  useCreateQuoteFromAgreementMutation,
} from 'api/generated/graphql'

export const useCreateQuoteFromAgreement = (): CreateQuoteFromAgreementMutationHookResult =>
  useCreateQuoteFromAgreementMutation()

export const createQuoteFromAgreementOptions = (
  agreement: GenericAgreement,
  contract: Contract,
): MutationFunctionOptions<
  CreateQuoteFromAgreementMutation,
  CreateQuoteFromAgreementMutationVariables
> => {
  return {
    variables: {
      agreementId: agreement.id,
      memberId: contract.holderMemberId,
    },
    refetchQueries: () => [
      {
        query: GetQuotesDocument,
        variables: { memberId: contract.holderMemberId },
      },
      {
        query: GetContractsDocument,
        variables: { memberId: contract.holderMemberId },
      },
    ],
  }
}
