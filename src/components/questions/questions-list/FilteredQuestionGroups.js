import PropTypes from 'prop-types'
import React from 'react'
import { Segment } from 'semantic-ui-react'
import styled from 'react-emotion'
import { QuestionGroup } from './QuestionGroup'
import { FadeIn } from 'hedvig-ui/animations/fade-in'
import { StandaloneMessage } from 'hedvig-ui/animations/standalone-message'

const List = styled(Segment)`
  width: 100%;
  &&& {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
`

export const FilteredQuestionGroups = ({ filterQuestionGroups }) => {
  return (
    <List>
      {filterQuestionGroups.length ? (
        <>
          {filterQuestionGroups.map((questionGroup, index) => (
            <FadeIn delay={`${index * 100}ms`}>
              <QuestionGroup
                key={questionGroup.id}
                questionGroup={questionGroup}
              />
            </FadeIn>
          ))}
        </>
      ) : (
        <StandaloneMessage paddingTop="25vh">List is empty</StandaloneMessage>
      )}
    </List>
  )
}

FilteredQuestionGroups.propTypes = {
  filterQuestionGroups: PropTypes.array.isRequired,
}
