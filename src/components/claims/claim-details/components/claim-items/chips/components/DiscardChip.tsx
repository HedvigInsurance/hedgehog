import React from 'react'

import styled from 'react-emotion'
import { BaseChip } from './BaseChip'

const Chip = styled(BaseChip)`
  && {
    background-color: transparent;
    color: ${({ theme }) => theme.accent};
    margin-top: 8px;
    font-weight: bold;
    margin-left: 7px;
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.accent};
  }
`

export const DiscardChip: React.FC<{ onClick: React.EventHandler<any> }> = ({
  onClick,
}) => {
  return <Chip label={'Reset'} onClick={onClick} />
}
