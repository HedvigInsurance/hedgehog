import React, { useContext } from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'react-router-dom'
import { useMemberNameAndContractMarketInfoQuery } from '../../api/generated/graphql'
import { MemberHistoryContext } from '../../utils/member-history'
import { MemberFlag } from '../member/shared/member-flag'

const MemberHistoryWrapper = styled('div')`
  display: flex;
  flex-wrap: wrap;
  margin-left: -1rem;
  width: calc(100% + 1rem);
`

const EmptyState = styled('div')`
  font-style: italic;
  margin-left: 1rem;
  color: ${({ theme }) => theme.mutedText};
`

export const MemberSuggestions: React.FC = () => {
  const { memberHistory } = useContext(MemberHistoryContext)

  return (
    <MemberHistoryWrapper>
      {memberHistory.length === 0 && (
        <EmptyState>No suggested members yet</EmptyState>
      )}

      {memberHistory.map((memberId) => (
        <MemberHistoryCard key={memberId} memberId={memberId} />
      ))}
    </MemberHistoryWrapper>
  )
}

const MemberHistoryCardWrapper = styled(Link)<{ muted: boolean }>`
  display: flex;
  flex-direction: column;
  width: calc((100% / 3) - 1rem);
  padding: 1.5rem;
  border-radius: 0.5rem;
  margin-left: 1rem;
  min-height: 5rem;
  margin-bottom: 1rem;
  & {
    ${({ theme, muted }) => css`
      background: ${theme.foreground};
      color: ${theme.backgroundLight} !important;

      ${muted && 'opacity: 0.5;'};
    `};
  }
`
const MemberName = styled('span')`
  display: block;
`
const MemberId = styled('span')`
  display: block;
  color: ${({ theme }) => theme.mutedText};
`

const MemberHistoryCard: React.FC<{ memberId: string }> = ({ memberId }) => {
  const { data } = useMemberNameAndContractMarketInfoQuery({
    variables: { memberId },
  })

  return (
    <MemberHistoryCardWrapper muted={!data?.member} to={`/members/${memberId}`}>
      <MemberName>
        {data?.member?.firstName} {data?.member?.lastName}&nbsp;
        <MemberFlag memberId={memberId} />
      </MemberName>
      <MemberId>{memberId}</MemberId>
    </MemberHistoryCardWrapper>
  )
}
