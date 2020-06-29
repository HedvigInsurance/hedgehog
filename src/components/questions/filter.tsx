import { Checkbox as StandardCheckbox } from 'hedvig-ui/checkbox'
import React from 'react'
import styled from 'react-emotion'

export enum FilterState {
  Even,
  Odd,
}

const Checkbox = styled(StandardCheckbox)`
  &.ui.checkbox {
    padding-right: 3rem;

    label {
      display: inline-flex;
      align-items: center;

      &:before,
      &:after {
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
`

const Label = styled('label')`
  padding: 0.5rem 1rem 0.5rem 3rem !important;
  border-radius: 100px;
  transition: background 300ms;
  &:hover {
    background: ${({ theme }) => theme.accentBackground};
  }

  &:before,
  &:after {
    left: 1rem !important;
  }
`

const TeamBadge = styled('div')`
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  border-radius: 2px;
  vertical-align: center;
  margin-left: 0.5rem;
`

const RedTeamBadge = styled(TeamBadge)`
  background-color: ${({ theme }) => theme.danger};
`
const GreenTeamBadge = styled(TeamBadge)`
  background-color: ${({ theme }) => theme.success};
`

export const QuestionsFilter: React.FC<{
  selected: ReadonlyArray<FilterState>
  onToggle: (filter: FilterState) => void
}> = ({ selected, onToggle }) => {
  return (
    <>
      <Checkbox
        label={
          <Label>
            Red team
            <RedTeamBadge />
          </Label>
        }
        checked={selected.includes(FilterState.Even)}
        onChange={() => onToggle(FilterState.Even)}
      />
      <Checkbox
        label={
          <Label>
            Green team
            <GreenTeamBadge />
          </Label>
        }
        checked={selected.includes(FilterState.Odd)}
        onChange={() => onToggle(FilterState.Odd)}
      />
    </>
  )
}
