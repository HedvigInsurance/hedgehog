import { QuestionGroup } from 'api/generated/graphql'
import { Checkbox as StandardCheckbox } from 'hedvig-ui/checkbox'
import { ThirdLevelHeadline } from 'hedvig-ui/typography'
import React from 'react'
import { Shield, ShieldShaded } from 'react-bootstrap-icons'
import styled from 'react-emotion'
import {
  doClaimFilter,
  doMarketFilter,
  doTeamFilter,
} from 'utils/questionGroup'

export enum FilterState {
  Even,
  Odd,
  Sweden,
  Norway,
  Denmark,
  HasOpenClaim,
  NoOpenClaim,
}

const FilterRow = styled('div')`
  margin-bottom: 1rem;
`

const FilterLabel = styled(ThirdLevelHeadline)`
  width: 70px;
  display: inline-flex;
  font-weight: bold;
`

const FilterCheckbox = styled(StandardCheckbox)`
  width: 200px;
  &.ui.checkbox {
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

const FilterName = styled.label`
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
  vertical-align: middle;
`

const TeamBadge = styled.div`
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
  questionGroups: ReadonlyArray<QuestionGroup>
  selected: ReadonlyArray<FilterState>
  onToggle: (filter: FilterState) => void
}> = ({ selected, onToggle, questionGroups }) => {
  const getCountByFilter = (
    filter: FilterState,
    filterer: (
      selectedFilters: FilterState[],
    ) => (questionGroup: QuestionGroup) => boolean,
  ) => {
    return questionGroups.filter(filterer([filter])).length
  }

  return (
    <>
      <FilterRow>
        <FilterLabel>Market: </FilterLabel>
        <FilterCheckbox
          label={
            <FilterName>
              Sweden ({getCountByFilter(FilterState.Sweden, doMarketFilter)}) 🇸🇪
            </FilterName>
          }
          checked={selected.includes(FilterState.Sweden)}
          onChange={() => onToggle(FilterState.Sweden)}
        />
        <FilterCheckbox
          label={
            <FilterName>
              Norway ({getCountByFilter(FilterState.Norway, doMarketFilter)}) 🇳🇴
            </FilterName>
          }
          checked={selected.includes(FilterState.Norway)}
          onChange={() => onToggle(FilterState.Norway)}
        />
        <FilterCheckbox
          label={
            <FilterName>
              Denmark ({getCountByFilter(FilterState.Denmark, doMarketFilter)})
              🇩🇰
            </FilterName>
          }
          checked={selected.includes(FilterState.Denmark)}
          onChange={() => onToggle(FilterState.Denmark)}
        />
      </FilterRow>
      <FilterRow>
        <FilterLabel>Team: </FilterLabel>
        <FilterCheckbox
          label={
            <FilterName>
              Red team ({getCountByFilter(FilterState.Even, doTeamFilter)})
              <RedTeamBadge />
            </FilterName>
          }
          checked={selected.includes(FilterState.Even)}
          onChange={() => onToggle(FilterState.Even)}
        />
        <FilterCheckbox
          label={
            <FilterName>
              Green team ({getCountByFilter(FilterState.Odd, doTeamFilter)})
              <GreenTeamBadge />
            </FilterName>
          }
          checked={selected.includes(FilterState.Odd)}
          onChange={() => onToggle(FilterState.Odd)}
        />
      </FilterRow>
      <FilterRow>
        <FilterLabel>Claim: </FilterLabel>
        <FilterCheckbox
          label={
            <FilterName>
              Has open claim️ (
              {getCountByFilter(FilterState.HasOpenClaim, doClaimFilter)}
              )
              <ShieldShaded style={{ marginLeft: '0.35rem' }} />
            </FilterName>
          }
          checked={selected.includes(FilterState.HasOpenClaim)}
          onChange={() => onToggle(FilterState.HasOpenClaim)}
        />
        <FilterCheckbox
          label={
            <FilterName>
              No open claim (
              {getCountByFilter(FilterState.NoOpenClaim, doClaimFilter)}
              )
              <Shield style={{ marginLeft: '0.35rem' }} />
            </FilterName>
          }
          checked={selected.includes(FilterState.NoOpenClaim)}
          onChange={() => onToggle(FilterState.NoOpenClaim)}
        />
      </FilterRow>
    </>
  )
}
