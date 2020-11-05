import { MonetaryAmountV2 } from 'api/generated/graphql'
import React from 'react'
import { Gem } from 'react-bootstrap-icons'
import styled from 'react-emotion'
import { formatMoney } from 'utils/money'
import { BaseChip, BaseChipProps } from './BaseChip'

const Chip = styled(BaseChip)`
  && {
    background-color: ${({ theme }) => theme.success};
    color: ${({ theme }) => theme.accentContrast};
    margin-top: 8px;
    font-weight: bold;
  }
`

const AdornmentChip = styled(BaseChip)`
  && {
    height: 70%;
    background: rgba(255, 255, 255, 0.2);
    color: ${({ theme }) => theme.accentContrast};
    margin-left: -6px;
    margin-right: 6px;
    padding-left: 0px;
    text-decoration: ${(props: BaseChipProps) =>
      props.ignored ? 'line-through' : 'none'};
  }
`

export const ValuationChip: React.FC<{
  loading: boolean
  valuation: MonetaryAmountV2
  ignored?: boolean
}> = ({ loading, valuation, ignored = false }) => {
  const valuationLabel = loading
    ? '...'
    : formatMoney(valuation, {
        useGrouping: true,
        maximumFractionDigits: 0,
      })

  return (
    <>
      <Chip
        label={'The depreciated valuation is'}
        icon={<Gem />}
        adornment={<AdornmentChip ignored={ignored} label={valuationLabel} />}
      />
    </>
  )
}
