import {
  ClaimValuation,
  GetClaimValuationQueryHookResult,
  useGetClaimValuationQuery,
} from 'api/generated/graphql'

type GetClaimValuationReturnTuple = [
  ClaimValuation | undefined,
  GetClaimValuationQueryHookResult | undefined,
]

export const useGetClaimValuation = (
  claimId: string,
): GetClaimValuationReturnTuple => {
  const queryResult = useGetClaimValuationQuery({
    variables: {
      claimId,
    },
  })
  const valuation = queryResult.data?.getClaimValuation as
    | ClaimValuation
    | undefined
  return [valuation, queryResult]
}
