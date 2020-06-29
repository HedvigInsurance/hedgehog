import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import { useMemberNameAndContractMarketInfoQuery } from 'api/generated/graphql'
import styled from 'react-emotion'
import { getMemberFlag, getMemberIdColor } from 'utils/member'
import { QuestionInfo } from './QuestionInfo'

const QuestionGroupInfoWrapper = styled('div')`
  display: flex;
  flex-direction: column;
  padding-left: 1.5rem;
  border-left: 7px solid ${({ memberId }) => getMemberIdColor(memberId)};
`

const MemberInfoWrapper = styled('div')`
  font-size: 1.5rem;
  padding-bottom: 1rem;
`

const QuestionGroupInfo = ({ questionGroup }) => {
  const memberQuery = useMemberNameAndContractMarketInfoQuery({
    variables: { memberId: questionGroup.memberId },
  })

  const memberDataMaybe = memberQuery?.data?.member
  return (
    <QuestionGroupInfoWrapper memberId={questionGroup.memberId}>
      <MemberInfoWrapper>
        {memberDataMaybe ? (
          <>
            {memberDataMaybe?.firstName} {memberDataMaybe?.lastName}{' '}
            {getMemberFlag(memberDataMaybe?.contractMarketInfo?.market)},{' '}
          </>
        ) : null}
        <Link to={`/members/${questionGroup.memberId}`}>
          {questionGroup.memberId}
        </Link>
      </MemberInfoWrapper>

      {questionGroup.questions.map((question) => {
        return <QuestionInfo key={question.id} question={question} />
      })}
    </QuestionGroupInfoWrapper>
  )
}

QuestionGroupInfo.propTypes = {
  questionGroup: PropTypes.object.isRequired,
}

export default QuestionGroupInfo
