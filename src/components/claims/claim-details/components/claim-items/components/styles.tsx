import { Chip, Select } from '@material-ui/core'
import styled from 'react-emotion'
import CreatableSelect from 'react-select/creatable'

export const StyledCreatableSelect = styled(CreatableSelect)`
  .custom-select__control {
    margin-top: 1px;
    border-radius: 7px;
    height: 44px;
    box-shadow: none;
    background-color: ${({ theme }) => theme.backgroundLight};
    border: 1px solid ${({ theme }) => theme.border};
    font-size: 1rem;
  }

  .custom-select__input {
    color: ${({ theme }) => theme.foreground};
    padding-left: 5px;
  }

  .custom-select__menu {
    border-radius: 0;
    hyphens: auto;
    margin-top: 0px;
    text-align: left;
    word-wrap: break-word;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.foreground};
  }

  .custom-select__option {
    &:hover {
      background: ${({ theme }) => theme.accentBackground};
    }
  }

  .custom-select__value-container {
    padding-left: 5px;
    overflow: visible;
  }

  .custom-select__multi-value__remove {
    display: none;
  }

  .custom-select__multi-value {
    padding-left: 5px;
    padding-right: 10px;
    border: 1px solid;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0);
  }

  .custom-select__multi-value__label {
    color: ${({ theme }) => theme.foreground};
  }

  .custom-select__single-value {
    color: ${({ theme }) => theme.foreground};
  }

  .custom-select__placeholder {
    display: none;
  }
`

export const UpcomingChip = styled(Chip)`
  font-weight: bold;
  color: ${({ theme }) => theme.semiStrongForeground};
  border: 1px solid ${({ theme }) => theme.semiStrongForeground};
`

export const CurrentChip = styled(Chip)`
  font-weight: bold;
  color: ${({ theme }) => theme.foreground};
  border: 1px solid ${({ theme }) => theme.foreground};
`

export const PreviousChip = styled(Chip)`
  font-weight: bold;
  color: ${({ theme }) => theme.placeholderColor};
  border: 1px solid ${({ theme }) => theme.placeholderColor};
};
`

export const ChevronRightWrapper = styled('span')`
  margin-right: 3px;
  margin-left: 3px;
  color: ${({ theme }) => theme.foreground};
  font-size: 0.68rem;
  font-weight: 500;
`

export const TrashIconWrapper = styled('span')`
  color: ${({ theme }) => theme.danger};
  font-size: 0.9rem;
`

export const Bold = styled('span')`
  font-weight: bold;
`

export const Placeholder = styled('div')`
  color: ${({ theme }) => theme.placeholderColor};
`

export const CurrencySelect = styled(Select)`
  color: ${({ theme }) => theme.foreground};
  text-align: right;
`
