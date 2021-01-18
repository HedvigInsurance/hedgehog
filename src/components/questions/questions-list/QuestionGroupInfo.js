import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'react-emotion'
import { getMemberFlag, getMemberIdColor } from 'utils/member'
import { QuestionInfo } from './QuestionInfo'
import { hasOpenClaim } from 'utils/claim'
import { ShieldShaded } from 'react-bootstrap-icons'
import { IconButton } from '@material-ui/core'
import { history } from 'store'
import { Popover } from 'hedvig-ui/popover'

const QuestionGroupInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.5rem;
  border-left: 7px solid ${({ memberId }) => getMemberIdColor(memberId)};
`

const StyledPopover = styled(Popover)`
  font-size: 1rem;
  vertical-align: middle;
`

const MemberInfoWrapper = styled.div`
  font-size: 1.5rem;
  padding-bottom: 1rem;
`

const QuestionGroupInfo = ({ questionGroup }) => {
  const member = questionGroup?.member
  return (
    <QuestionGroupInfoWrapper memberId={questionGroup.memberId}>
      <MemberInfoWrapper>
        {member && (
          <>
            {hasOpenClaim(member.claims) && (
              <StyledPopover
                contents={
                  <>
                    {member.claims.length > 1
                      ? 'Member has multiple open claims'
                      : 'Go to claim'}
                  </>
                }
              >
                <IconButton
                  disabled={member.claims.length > 1}
                  onClick={() =>
                    history.push(
                      `/claims/${member.claims[0].id}/members/${member.memberId}`,
                    )
                  }
                  color={'primary'}
                >
                  <ShieldShaded />
                </IconButton>
              </StyledPopover>
            )}
            {member?.firstName} {member?.lastName}{' '}
            {getMemberFlag(member?.contractMarketInfo)}{' '}
          </>
        )}
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
