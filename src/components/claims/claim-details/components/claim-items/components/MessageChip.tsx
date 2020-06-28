import { UpsertClaimItemInput } from 'api/generated/graphql'
import { useCanEvaluate } from 'graphql/use-can-evaluate'
import { useGetEvaluation } from 'graphql/use-get-evaluation'
import React from 'react'
import {
  DiscardChip,
  InfoChip,
  InputChip,
  MarketValuationChip,
  NoValuationChip,
  ValuationChip,
} from './chips'

export const MessageChip: React.FC<{
  formData: UpsertClaimItemInput
}> = ({ formData }) => {
  const [customValuation, setCustomValuation] = React.useState('')
  const priceAndDateAvailable =
    formData.purchasePriceAmount != null && formData.dateOfPurchase != null

  const [evaluationStatus] = useCanEvaluate(
    'SE_APARTMENT_RENT',
    formData.itemFamilyId,
    formData.itemTypeId,
  )

  const [evaluation] = useGetEvaluation(
    formData.purchasePriceAmount ?? 0,
    formData.itemFamilyId,
    'SE_APARTMENT_RENT',
    formData.dateOfPurchase,
    formData.itemTypeId,
    null,
  )

  const canEvaluate = !!formData.itemFamilyId && !!evaluationStatus?.canEvaluate
  const evaluationType = evaluation?.evaluationRule?.evaluationType ?? ''

  return (
    <>
      {console.log('Hello?')}
      {canEvaluate && priceAndDateAvailable ? (
        evaluationType === 'MARKET_PRICE' ? (
          <>
            <MarketValuationChip />
          </>
        ) : (
          <>
            <ValuationChip
              valuation={{
                amount: evaluation?.depreciatedValue?.toString() ?? '-',
                currency: formData?.purchasePriceCurrency ?? 'SEK',
              }}
              ignored={customValuation !== ''}
            />
            <InputChip
              value={customValuation}
              placeholder="Edit"
              onChange={({ target: { value } }) => setCustomValuation(value)}
            />
            {customValuation !== '' && (
              <DiscardChip onClick={() => setCustomValuation('')} />
            )}
          </>
        )
      ) : canEvaluate ? (
        <InfoChip />
      ) : priceAndDateAvailable && !!formData.itemFamilyId ? (
        <>
          <NoValuationChip />
        </>
      ) : (
        <></>
      )}
    </>
  )
}
