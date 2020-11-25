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
  typeOfContract?: string,
): GetClaimValuationReturnTuple => {
  const queryResult = useGetClaimValuationQuery({
    variables: {
      claimId,
      typeOfContract,
    },
  })
  const valuation = queryResult.data?.getClaimValuation as
    | ClaimValuation
    | undefined
  return [valuation, queryResult]
}
