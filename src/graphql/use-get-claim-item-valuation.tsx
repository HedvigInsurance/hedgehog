import {
  ClaimItemValuation,
  GetClaimItemValuationInput,
  GetClaimItemValuationQueryHookResult,
  useGetClaimItemValuationQuery,
} from 'api/generated/graphql'

type GetClaimItemValuationReturnTuple = [
  ClaimItemValuation | undefined,
  GetClaimItemValuationQueryHookResult | undefined,
]

export const useGetClaimItemValuation = (
  request: GetClaimItemValuationInput,
): GetClaimItemValuationReturnTuple => {
  const queryResult = useGetClaimItemValuationQuery({
    variables: {
      request,
    },
  })
  const valuation = queryResult.data?.getClaimItemValuation as
    | ClaimItemValuation
    | undefined
  return [valuation, queryResult]
}
