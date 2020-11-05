import React from 'react'
import { Gem } from 'react-bootstrap-icons'
import styled from 'react-emotion'
import { BaseChip } from './BaseChip'

const Chip = styled(BaseChip)`
  && {
    background-color: ${({ theme }) => theme.success};
    color: ${({ theme }) => theme.accentContrast};
    margin-top: 8px;
    font-weight: bold;
  }
`

export const MarketValuationChip: React.FC = ({}) => {
  return (
    <Chip
      label={'This item should be valued at the as-new price'}
      icon={<Gem />}
    />
  )
}
