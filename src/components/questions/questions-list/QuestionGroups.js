import React from 'react'
import styled from 'react-emotion'
import { FilteredQuestionGroups } from './FilteredQuestionGroups'
import { FilterState } from 'components/questions/filter'
import { isMemberIdEven } from 'utils/member'
import { useQuestionGroups } from 'graphql/use-question-groups'
import { Market } from 'api/generated/graphql'
import { hasOpenClaim } from 'utils/claim'

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
`

const doTeamFilter = (selectedFilters) => ({ memberId }) =>
  (selectedFilters.includes(FilterState.Even) && isMemberIdEven(memberId)) ||
  (selectedFilters.includes(FilterState.Odd) && !isMemberIdEven(memberId))

const doMarketFilter = (selectedFilters) => ({ member }) =>
  (selectedFilters.includes(FilterState.Sweden) &&
    !member.contractMarketInfo?.market) ||
  (selectedFilters.includes(FilterState.Sweden) &&
    member.contractMarketInfo?.market === Market.Sweden) ||
  (selectedFilters.includes(FilterState.Norway) &&
    member.contractMarketInfo?.market === Market.Norway)

const doClaimFilter = (selectedFilters) => ({ member }) =>
  (selectedFilters.includes(FilterState.HasOpenClaim) &&
    hasOpenClaim(member.claims)) ||
  (selectedFilters.includes(FilterState.NoOpenClaim) &&
    !hasOpenClaim(member.claims))

const QuestionGroups = ({ selectedFilters }) => {
  const [questionGroups, { loading }] = useQuestionGroups()

  if (loading) {
    return <>Loading...</>
  }

  if (!questionGroups) {
    return <>Something went wrong :(</>
  }

  return (
    <ListContainer>
      <FilteredQuestionGroups
        filterQuestionGroups={questionGroups
          .filter(doTeamFilter(selectedFilters))
          .filter(doMarketFilter(selectedFilters))
          .filter(doClaimFilter(selectedFilters))}
      />
    </ListContainer>
  )
}

export default QuestionGroups
