import { TypeOfContract } from 'api/generated/graphql'
import { useCanValuateClaimItem } from 'graphql/use-can-valuate-claim-item'
import { useGetClaimItemValuation } from 'graphql/use-get-claim-item-valuation'
import { UpsertClaimItemVariables } from 'graphql/use-upsert-claim-item'
import React from 'react'
import { CustomValuationChip } from './chips/CustomValuationChip'
import { ValuationMessageChip } from './chips/ValuationMessageChip'

export const ValuationInfo: React.FC<{
  request: UpsertClaimItemVariables
  setValuation: React.EventHandler<any>
  customValuationAmount: string
  setCustomValuationAmount: React.EventHandler<any>
  defaultCurrency: string
  typeOfContract: TypeOfContract
}> = ({
  request,
  setValuation,
  customValuationAmount,
  setCustomValuationAmount,
  defaultCurrency,
  typeOfContract,
}) => {
  const {
    itemFamilyId,
    itemTypeId,
    purchasePriceAmount,
    purchasePriceCurrency = defaultCurrency,
    dateOfPurchase,
  } = { ...request }

  const [
    valuationStatus,
    { loading: loadingValuation },
  ] = useCanValuateClaimItem(itemFamilyId, itemTypeId, typeOfContract)

  const [claimItemValuation] = useGetClaimItemValuation({
    purchasePrice: {
      amount: Number(purchasePriceAmount),
      currency: purchasePriceCurrency,
    },
    itemFamilyId,
    typeOfContract,
    purchaseDate: dateOfPurchase,
    itemTypeId,
    baseDate: null,
  })

  React.useEffect(() => {
    setValuation(claimItemValuation?.depreciatedValue)
  }, [claimItemValuation?.depreciatedValue])

  React.useEffect(() => {
    setCustomValuationAmount('')
  }, [itemFamilyId, itemTypeId])

  return (
    <>
      <ValuationMessageChip
        valuation={claimItemValuation ?? null}
        valuationStatus={valuationStatus ?? null}
        loadingValuation={loadingValuation}
        itemFamilyId={itemFamilyId}
        price={Number(purchasePriceAmount)}
        currency={purchasePriceCurrency}
        dateOfPurchase={dateOfPurchase}
        customValuation={customValuationAmount}
      />
      <CustomValuationChip
        request={request}
        customValuationAmount={customValuationAmount}
        customValuationCurrency={purchasePriceCurrency}
        setCustomValuationAmount={setCustomValuationAmount}
        valuation={claimItemValuation ?? null}
      />
    </>
  )
}
