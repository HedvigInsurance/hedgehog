import { MonetaryAmountV2 } from 'api/generated/graphql'
import React from 'react'
import styled from 'react-emotion'
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
}> = ({ totalValuation }) => {
  if (!totalValuation) {
    return <></>
  }

  const { amount, currency } = totalValuation

  return <Chip label={`Total valuation: ${amount} ${currency}`} />
}
