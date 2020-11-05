import React from 'react'
import { EyeFill } from 'react-bootstrap-icons'
import styled from 'react-emotion'
import { BaseChip } from './BaseChip'

const StyledChip = styled(BaseChip)`
  && {
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.accentContrast};
    margin-top: 8px;
    font-weight: bold;
    margin-left: 7px;
  }
`

export const NoValuationChip: React.FC = ({}) => {
  return (
    <StyledChip
      label={"There's no valuation available for this item"}
      icon={<EyeFill />}
    />
  )
}
