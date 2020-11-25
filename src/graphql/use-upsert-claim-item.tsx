import {
  UpsertClaimItemInput,
  UpsertClaimItemMutationResult,
  useUpsertClaimItemMutation,
} from 'api/generated/graphql'

type UpsertClaimItemReturnTuple = [
  (variables: UpsertClaimItemVariables) => void,
  UpsertClaimItemMutationResult,
]

export interface UpsertClaimItemVariables {
  itemFamilyId: string
  itemTypeId: string
  itemBrandId?: string
  itemModelId?: string
  dateOfPurchase?: string
  purchasePriceAmount?: string
  purchasePriceCurrency?: string
  automaticValuationAmount?: string
  customValuationAmount?: string
  note?: string
}

const isEmpty = (s?: string | null) => s === '' || s === null || s === undefined

export const useUpsertClaimItem = (
  claimId: string,
): UpsertClaimItemReturnTuple => {
  const [upsertClaimItemMutation, mutationResult] = useUpsertClaimItemMutation()

  const upsertClaimItem = ({
    itemFamilyId,
    itemTypeId,
    itemBrandId,
    itemModelId,
    dateOfPurchase,
    purchasePriceAmount,
    purchasePriceCurrency,
    automaticValuationAmount,
    customValuationAmount,
    note,
  }: UpsertClaimItemVariables) => {
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
      automaticValuation: !isEmpty(automaticValuationAmount)
        ? {
            amount: Number(automaticValuationAmount),
            currency: purchasePriceCurrency,
          }
        : null,
      customValuation: !isEmpty(customValuationAmount)
        ? {
            amount: Number(customValuationAmount),
            currency: purchasePriceCurrency,
          }
        : null,
      note: note || null,
    }

    upsertClaimItemMutation({
      variables: {
        request,
      },
      refetchQueries: ['GetClaimItems', 'GetClaimValuation'],
    })
  }

  return [upsertClaimItem, mutationResult]
}
