import React from 'react'
import styled from 'react-emotion'
import { FilteredQuestionGroups } from './FilteredQuestionGroups'
import { FilterState } from 'components/questions/filter'
import { isMemberIdEven } from 'utils/member'
import { useQuestionGroups } from 'graphql/use-question-groups'

const ListContainer = styled('div')`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
`

const doFilter = (selectedFilters) => ({ memberId }) =>
  (selectedFilters.includes(FilterState.Even) && isMemberIdEven(memberId)) ||
  (selectedFilters.includes(FilterState.Odd) && !isMemberIdEven(memberId))

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
        filterQuestionGroups={questionGroups.filter(doFilter(selectedFilters))}
      />
    </ListContainer>
  )
}

export default QuestionGroups
