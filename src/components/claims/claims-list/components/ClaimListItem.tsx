import { Claim, ClaimState } from 'api/generated/graphql'
import { LinkRow } from 'components/shared'
import { parseISO } from 'date-fns'
import formatDate from 'date-fns/format'
import isValidDate from 'date-fns/isValid'
import { withFadeIn } from 'hedvig-ui/animations/fade-in'
import { Badge } from 'hedvig-ui/badge'
import { Capitalized } from 'hedvig-ui/typography'
import React from 'react'
import styled from 'react-emotion'
import { Table, TableRowProps } from 'semantic-ui-react'
import { history } from 'store'
import { getMemberIdColor } from 'utils/member'
import { formatMoney } from 'utils/money'

const MemberIdCell = styled(Table.Cell)<{ memberId: string }>(
  ({ memberId }) => ({
    borderLeft: `7px solid ${getMemberIdColor(memberId)} !important`,
  }),
)

const FadeInLinkRow = withFadeIn<TableRowProps>(LinkRow)

const splitOnUpperCase = (s: string) => {
  const splitResult = s.match(/[A-Z][a-z]+|[0-9]+/g)
  return splitResult?.join(' ') ?? null
}

export const ClaimListItem: React.FC<{
  item: Claim
  index: number
  active?: boolean
}> = ({ item, index, active = false }) => {
  const date = parseISO(item.registrationDate)
  const formattedDate = isValidDate(date)
    ? formatDate(date, 'dd MMMM yyyy HH:mm')
    : '-'

  const memberId = item.member?.memberId
  const claimId = item.id

  const claimType = item?.type?.__typename
    ? splitOnUpperCase(item?.type?.__typename?.toString())
    : null

  if (!memberId || !claimId) {
    return null
  }

  return (
    <FadeInLinkRow
      delay={`${index * 50}ms`}
      onClick={() => history.push(`/claims/${claimId}/members/${memberId}`)}
      active={active}
    >
      <MemberIdCell memberId={memberId}>{memberId}</MemberIdCell>
      <Table.Cell>{formattedDate}</Table.Cell>
      <Table.Cell>{claimType}</Table.Cell>
      <Table.Cell textAlign={'center'}>
        <Badge
          size={'medium'}
          variant={item.state === ClaimState.Closed ? 'success' : 'default'}
        >
          <Capitalized>{item.state}</Capitalized>
        </Badge>
      </Table.Cell>
      <Table.Cell>
        {item.reserves &&
          formatMoney(item.reserves, {
            useGrouping: true,
            maximumFractionDigits: 0,
          })}
      </Table.Cell>
    </FadeInLinkRow>
  )
}
