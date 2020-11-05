import {
  UpsertClaimItemInput,
  UpsertClaimItemMutationResult,
  useUpsertClaimItemMutation,
} from 'api/generated/graphql'

type UpsertClaimItemReturnTuple = [
  (
    itemFamilyId: string,
    itemTypeId: string,
    itemBrandId?: string,
    itemModelId?: string,
    dateOfPurchase?: Date,
    purchasePriceAmount?: string,
    purchasePriceCurrency?: string,
    automaticValuationAmount?: string,
    customValuationAmount?: string,
    note?: string,
  ) => void,
  UpsertClaimItemMutationResult,
]

const isEmpty = (s?: string | null) => s === '' || s === null || s === undefined

export const useUpsertClaimItem = (
  claimId: string,
): UpsertClaimItemReturnTuple => {
  const [upsertClaimItemMutation, mutationResult] = useUpsertClaimItemMutation()

  const upsertClaimItem = (
    itemFamilyId: string,
    itemTypeId: string,
    itemBrandId?: string,
    itemModelId?: string,
    dateOfPurchase?: Date,
    purchasePriceAmount?: string,
    purchasePriceCurrency?: string,
    automaticValuationAmount?: string,
    customValuationAmount?: string,
    note?: string,
  ) => {
    const request: UpsertClaimItemInput = {
      claimId,
      itemFamilyId,
      itemTypeId,
      itemBrandId: itemBrandId ?? null,
      itemModelId: itemModelId ?? null,
      dateOfPurchase: dateOfPurchase || null,
      purchasePrice: !isEmpty(purchasePriceAmount)
        ? {
            amount: Number(purchasePriceAmount),
            currency: purchasePriceCurrency,
          }
        : null,
      automaticValuation: automaticValuationAmount,
      customValuation: !isEmpty(customValuationAmount)
        ? {
            amount: Number(customValuationAmount),
            currency: purchasePriceCurrency,
          }
        : null,
      note: note || null,
    }

    return upsertClaimItemMutation({
      variables: {
        request,
      },
      refetchQueries: ['GetClaimItems'],
    })
  }

  return [upsertClaimItem, mutationResult]
}
