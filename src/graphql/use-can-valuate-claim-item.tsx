import {
  CanValuateClaimItemQueryHookResult,
  useCanValuateClaimItemQuery,
} from 'api/generated/graphql'

type CanValuateClaimItemReturnTuple = [
  boolean | undefined,
  CanValuateClaimItemQueryHookResult,
]

export const useCanValuateClaimItem = (
  itemFamilyId: string,
  itemTypeId: string | null,
  typeOfContract: string,
): CanValuateClaimItemReturnTuple => {
  const queryResult = useCanValuateClaimItemQuery({
    variables: {
      typeOfContract,
      itemFamilyId,
      itemTypeId,
    },
  })
  const canValuate = queryResult.data?.canValuateClaimItem?.canValuate as
    | boolean
    | undefined

  return [canValuate, queryResult]
}
