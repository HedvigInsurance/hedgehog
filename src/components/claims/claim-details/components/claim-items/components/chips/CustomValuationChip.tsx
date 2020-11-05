import { ClaimItemValuation } from 'api/generated/graphql'
import { UpsertClaimItemVariables } from 'graphql/use-upsert-claim-item'
import React from 'react'
import { DiscardChip } from './components/DiscardChip'
import { InputChip } from './components/InputChip'

export const CustomValuationChip: React.FC<{
  request: UpsertClaimItemVariables
  customValuationAmount: string
  customValuationCurrency: string
  setCustomValuationAmount: React.EventHandler<any>
  valuation: ClaimItemValuation | null
}> = ({
  request,
  customValuationAmount,
  customValuationCurrency,
  setCustomValuationAmount,
  valuation,
}) => {
  return (
    <>
      {request.itemFamilyId && (
        <>
          <InputChip
            value={customValuationAmount}
            currency={customValuationCurrency}
            placeholder={
              valuation?.valuationRule?.valuationType === 'MARKET_PRICE'
                ? 'Add valuation'
                : 'Custom valuation'
            }
            onChange={({ target: { value } }) =>
              setCustomValuationAmount(value)
            }
          />
          {customValuationAmount !== '' && (
            <DiscardChip onClick={() => setCustomValuationAmount('')} />
          )}
        </>
      )}
    </>
  )
}
