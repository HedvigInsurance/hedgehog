import { MonetaryAmountV2 } from 'api/generated/graphql'
import React from 'react'
import styled from 'react-emotion'
import { formatMoney } from 'utils/money'
import { BaseChip } from './BaseChip'

const Chip = styled(BaseChip)`
  && {
    background: ${({ theme }) => theme.success};
    color: ${({ theme }) => theme.accentContrast};
    margin-top: 8px;
    font-weight: bold;
    margin-left: 7px;
  }
`

export const TotalValuationChip: React.FC<{
  totalValuation?: MonetaryAmountV2 | null
  deductible?: MonetaryAmountV2 | null
}> = ({ totalValuation, deductible }) => {
  if (!totalValuation || !deductible) {
    return <></>
  }

  return (
    <>
      <Chip
        label={`Total valuation: ${formatMoney(totalValuation, {
          useGrouping: true,
          maximumFractionDigits: 0,
        })}`}
      />
      <Chip
        label={`Deduction: ${formatMoney(deductible, {
          useGrouping: true,
          maximumFractionDigits: 0,
        })}`}
      />
    </>
  )
}
