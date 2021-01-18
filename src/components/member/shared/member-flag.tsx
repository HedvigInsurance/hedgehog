import { useContractMarketInfo } from 'graphql/use-get-member-contract-market-info'
import React from 'react'
import { getMemberFlag } from 'utils/member'

export const MemberFlag: React.FC<{
  memberId: string
}> = ({ memberId }) => {
  const [contractMarket] = useContractMarketInfo(memberId)
  return <>{getMemberFlag(contractMarket)}</>
}
