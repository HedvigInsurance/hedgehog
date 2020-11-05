import { UpsertClaimItemVariables } from 'graphql/use-upsert-claim-item'
import React from 'react'
import { DiscardChip } from './components/DiscardChip'
import { InputChip } from './components/InputChip'

export const CustomValuationChip: React.FC<{
  formData: UpsertClaimItemVariables
  onChange: (amount: string) => void
  onReset: () => void
}> = ({ formData, onChange, onReset }) => {
  const { customValuationAmount: amount, purchasePriceCurrency: currency } = {
    ...formData,
  }

  if (!currency) {
    return <></>
  }

  return (
    <>
      <InputChip
        value={amount ?? ''}
        currency={currency}
        placeholder={'Custom valuation'}
        onChange={({ target: { value } }) => onChange(value)}
      />
      {amount !== '' && <DiscardChip onClick={() => onReset()} />}
    </>
  )
}
