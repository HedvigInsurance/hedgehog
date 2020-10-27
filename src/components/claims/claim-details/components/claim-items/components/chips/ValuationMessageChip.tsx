import { CanValuateClaimItem, ClaimItemValuation } from 'api/generated/graphql'
import { TotalValuationChip } from 'components/claims/claim-details/components/claim-items/components/chips/components/TotalValuationChip'
import React from 'react'
import { getValuationExplanation } from 'utils/claim-item'
import { ExplanationPopover } from '../styles'
import { InfoChip } from './components/InfoChip'
import { MarketValuationChip } from './components/MarketValuationChip'
import { NoValuationChip } from './components/NoValuationChip'
import { ValuationChip } from './components/ValuationChip'

export const ValuationMessageChip: React.FC<{
  valuation: ClaimItemValuation | null
  valuationStatus: CanValuateClaimItem | null
  itemFamilyId: string
  price?: number | null
  currency: string
  dateOfPurchase: string
  customValuation: string
  loadingValuation: boolean
}> = ({
  valuation,
  valuationStatus,
  itemFamilyId,
  price,
  currency,
  dateOfPurchase,
  customValuation,
  loadingValuation,
}) => {
  const priceAndDateAvailable = price && dateOfPurchase?.length === 10
  const canValuateClaimItem = !!itemFamilyId && !!valuationStatus?.canValuate
  const valuationType = valuation?.valuationRule?.valuationType ?? ''
  const marketValuation = valuationType === 'MARKET_PRICE'
  const formattedValuation = valuation?.depreciatedValue?.amount
    ? {
        amount: valuation?.depreciatedValue?.amount,
        currency,
      }
    : '...'

  if (canValuateClaimItem && priceAndDateAvailable && marketValuation) {
    return <MarketValuationChip />
  }

  if (canValuateClaimItem && priceAndDateAvailable) {
    return (
      <ExplanationPopover
        contents={<>{getValuationExplanation(valuation?.valuationRule)}</>}
      >
        <ValuationChip
          valuation={formattedValuation}
          ignored={customValuation !== ''}
        />
      </ExplanationPopover>
    )
  }

  if (canValuateClaimItem) {
    return <InfoChip />
  }

  if (itemFamilyId && !loadingValuation) {
    return <NoValuationChip />
  }

  return <TotalValuationChip totalValuation={valuation?.depreciatedValue} />
}
