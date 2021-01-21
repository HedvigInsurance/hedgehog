import { ClaimItemValuation } from 'api/generated/graphql'
import { useGetClaimItemValuation } from 'graphql/use-get-claim-item-valuation'
import { UpsertClaimItemVariables } from 'graphql/use-upsert-claim-item'
import React from 'react'
import { InfoChip } from './components/InfoChip'
import { MarketValuationChip } from './components/MarketValuationChip'
import { ValuationChip } from './components/ValuationChip'

export const MessageChip: React.FC<{
  onValuation: (valuation: ClaimItemValuation) => void
  typeOfContract: string
  formData: UpsertClaimItemVariables
}> = ({ onValuation, typeOfContract, formData }) => {
  const {
    itemFamilyId,
    itemTypeId,
    purchasePriceAmount,
    purchasePriceCurrency,
    customValuationAmount,
    dateOfPurchase,
  } = formData

  const purchasePrice = {
    amount: Number(purchasePriceAmount),
    currency: purchasePriceCurrency,
  }

  const [claimItemValuation, { loading }] = useGetClaimItemValuation({
    purchasePrice,
    itemFamilyId,
    typeOfContract,
    purchaseDate: dateOfPurchase,
    itemTypeId,
    baseDate: null,
  })

  React.useEffect(() => {
    if (claimItemValuation) {
      onValuation(claimItemValuation)
    }
  }, [claimItemValuation])

  const { depreciatedValue, valuationRule } = { ...claimItemValuation }
  const { valuationType } = { ...valuationRule }

  const priceAndDateAvailable =
    purchasePriceAmount && dateOfPurchase?.length === 10

  if (valuationType === 'MARKET_PRICE') {
    return <MarketValuationChip />
  }

  if (depreciatedValue) {
    return (
      <ValuationChip
        loading={loading}
        valuation={depreciatedValue}
        ignored={customValuationAmount !== ''}
      />
    )
  }

  if (!priceAndDateAvailable) {
    return <InfoChip />
  }

  return <></>
}