import { useMemberNameAndContractMarketInfoQuery } from 'api/generated/graphql'
import {
  EmptyState,
  MemberHistoryCardWrapper,
  MemberHistoryWrapper,
  MemberId,
  MemberName,
} from 'components/members-search/styles'
import React, { useContext } from 'react'
import { MemberHistoryContext } from 'utils/member-history'
import { MemberFlag } from '../../member/shared/member-flag'

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
