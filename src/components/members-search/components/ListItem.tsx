import { Member } from 'api/generated/graphql'
import { ContractCountCircles } from 'components/members-search/components/ContractCountCircles'
import {
  CircleWrapper,
  MemberAgeWrapper,
} from 'components/members-search/styles'
import { format, parseISO } from 'date-fns'
import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { getFirstMasterInception, getLastTerminationDate } from 'utils/contract'
import { getMemberFlag, MemberAge } from 'utils/member'

export const ListItem: React.FC<{ member: Member; active?: boolean }> = ({
  member,
  active,
}) => {
  const market = member?.contractMarketInfo?.market

  const contracts = member.contracts

  return (
    <Table.Row active={active}>
      <Table.Cell>
        {member.memberId ? (
          <Link to={`/members/${member.memberId}`}>{member.memberId}</Link>
        ) : (
          '-'
        )}
      </Table.Cell>
      <Table.Cell>
        {member.firstName ?? '-'} {member.lastName ?? '-'}{' '}
        {market && getMemberFlag(market)}
        <MemberAgeWrapper>
          <MemberAge birthDateString={member.birthDate} />
        </MemberAgeWrapper>
      </Table.Cell>
      <Table.Cell>
        {member.signedOn &&
          format(parseISO(member.signedOn), 'MMM d, yyy, HH:ii')}
      </Table.Cell>
      <Table.Cell>{getFirstMasterInception(contracts)}</Table.Cell>
      <Table.Cell>{getLastTerminationDate(contracts)}</Table.Cell>
      <Table.Cell>
        <CircleWrapper>
          <ContractCountCircles contracts={contracts} />
        </CircleWrapper>
      </Table.Cell>
    </Table.Row>
  )
}
