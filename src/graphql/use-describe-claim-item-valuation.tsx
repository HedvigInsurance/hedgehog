import {
  DescribeClaimItemValuationQueryHookResult,
  useDescribeClaimItemValuationQuery,
} from 'api/generated/graphql'

type DescribeClaimItemValuationReturnTuple = [
  string | undefined,
  DescribeClaimItemValuationQueryHookResult | undefined,
]

export const useDescribeClaimItemValuation = (
  claimItemId: string,
  typeOfContract: string,
): DescribeClaimItemValuationReturnTuple => {
  const queryResult = useDescribeClaimItemValuationQuery({
    variables: {
      claimItemId,
      typeOfContract,
    },
  })
  const description = queryResult.data?.describeClaimItemValuation as
    | string
    | undefined
  return [description, queryResult]
}
