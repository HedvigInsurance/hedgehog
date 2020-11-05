import { MonetaryAmountV2 } from 'api/generated/graphql'
import React from 'react'
import styled from 'react-emotion'
import { formatMoney } from 'utils/money'
import { BaseChip } from './BaseChip'
import { useGetClaimValuation } from 'src/graphql/use-get-claim-valuation'

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

  return (
    <Chip
      label={`Total valuation: ${formatMoney(totalValuation, {
        useGrouping: true,
        maximumFractionDigits: 0,
      })}`}
    />
  )
}
