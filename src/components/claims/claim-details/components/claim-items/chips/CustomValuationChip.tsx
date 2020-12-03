import React from 'react'
import { DiscardChip } from './components/DiscardChip'
import { InputChip } from './components/InputChip'

export const CustomValuationChip: React.FC<{
  amount?: string
  currency?: string
  onChange: (amount: string) => void
  onReset: () => void
}> = ({ amount, currency, onChange, onReset }) => {
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
