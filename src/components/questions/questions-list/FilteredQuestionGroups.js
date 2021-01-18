import PropTypes from 'prop-types'
import React from 'react'
import { Segment } from 'semantic-ui-react'
import styled from 'react-emotion'
import { QuestionGroup } from './QuestionGroup'
import { StandaloneMessage } from 'hedvig-ui/animations/standalone-message'
import { withFadeIn } from 'hedvig-ui/animations/fade-in'

const List = styled(Segment)`
  width: 100%;
  &&& {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
  }
`

const FadeInQuestionGroup = withFadeIn(QuestionGroup)

export const FilteredQuestionGroups = ({ filterQuestionGroups }) => {
  return (
    <List>
      {filterQuestionGroups.length ? (
        <>
          {filterQuestionGroups.map((questionGroup, index) => (
            <FadeInQuestionGroup
              delay={`${index * 100}ms`}
              key={questionGroup.id}
              questionGroup={questionGroup}
            />
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
