import { Claim } from 'api/generated/graphql'
import { LinkRow } from 'components/shared'
import { parseISO } from 'date-fns'
import formatDate from 'date-fns/format'
import isValidDate from 'date-fns/isValid'
import React from 'react'
import styled from 'react-emotion'
import { Table } from 'semantic-ui-react'
import { history } from 'store'
import { getMemberIdColor } from 'utils/member'
import { formatMoney } from 'utils/money'

const MemberIdCell = styled(Table.Cell)<{ memberId: string }>(
  ({ memberId }) => ({
    borderLeft: `7px solid ${getMemberIdColor(memberId)} !important`,
  }),
)

const linkClickHandler = (id: string, userId: string) => {
  history.push(`/claims/${id}/members/${userId}`)
}

export const TableRow: React.FC<{ item: Claim }> = ({ item }) => {
  const date = parseISO(item.registrationDate)
  const formattedDate = isValidDate(date)
    ? formatDate(date, 'dd MMMM yyyy HH:mm')
    : '-'

  return (
    <LinkRow
      onClick={() =>
        linkClickHandler(
          item.id ?? '123456',
          item?.member?.memberId ?? '123456',
        )
      }
    >
      {
        // TODO: Don't have staging data right now, will fix this
      }
      <MemberIdCell memberId={item?.member?.memberId ?? '123456'}>
        {item?.member?.memberId ?? '123456'}
      </MemberIdCell>
      <Table.Cell>{formattedDate}</Table.Cell>
      <Table.Cell>{item.type}</Table.Cell>
      <Table.Cell>{item.state}</Table.Cell>
      <Table.Cell>
        {formatMoney(item.reserves, { maximumFractionDigits: 0 })}
      </Table.Cell>
    </LinkRow>
  )
}
