import { Chip } from '@material-ui/core'
import { ChipProps } from '@material-ui/core/Chip'
import React from 'react'
import styled from 'react-emotion'

const ChipIconBase = styled.span`
  && {
    color: ${({ theme }) => theme.accentContrast};
    font-size: 0.9rem;
    padding: 9px;
    padding-right: 8px;
    margin-right: -15px;
  }
`

export interface BaseChipProps extends ChipProps {
  adornment?: React.ReactElement | undefined
  ignored?: boolean
}

export const BaseChip: React.FC<BaseChipProps> = ({
  label,
  icon,
  adornment,
  onDelete,
  onClick,
  clickable,
  className,
}) => {
  return (
    <Chip
      label={label}
      avatar={icon ? <ChipIconBase>{icon}</ChipIconBase> : undefined}
      onDelete={onDelete ?? (adornment && (() => void 0))}
      onClick={onClick}
      clickable={clickable}
      deleteIcon={<>{adornment}</>}
      className={className}
    />
  )
}
