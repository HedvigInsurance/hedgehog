import { LinkRow } from 'components/shared'
import { parseISO } from 'date-fns'
import formatDate from 'date-fns/format'
import isValidDate from 'date-fns/isValid'
import { withFadeIn } from 'hedvig-ui/animations/fade-in'
import React from 'react'
import styled from 'react-emotion'
import { Table, TableRowProps } from 'semantic-ui-react'
import { history } from 'store'
import {
  Claim,
  ClaimSearchFilter,
  ClaimSortColumn,
  ClaimsStore,
} from 'store/types/claimsTypes'
import { useVerticalKeyboardNavigation } from 'utils/keyboard-actions'
import { getMemberIdColor } from 'utils/member'
import BackendPaginatorList from '../../shared/paginator-list/BackendPaginatorList'

export interface BackendServedClaimsListProps {
  claims: ClaimsStore
  claimsRequest: (filter: ClaimSearchFilter) => void
}

const MemberIdCell = styled(Table.Cell)<{ memberId: string }>(
  ({ memberId }) => ({
    borderLeft: `7px solid ${getMemberIdColor(memberId)} !important`,
  }),
)

const linkClickHandler = (id: string, userId: string) => {
  history.push(`/claims/${id}/members/${userId}`)
}

const FadeInLinkRow = withFadeIn<TableRowProps>(LinkRow)

const getTableRow = (currentlyActiveIndex: number) => (
  item: Claim,
  itemIndex: number,
) => {
  const date = parseISO(item.date)
  const formattedDate = isValidDate(date)
    ? formatDate(date, 'dd MMMM yyyy HH:mm')
    : '-'

  return (
    <FadeInLinkRow
      delay={`${itemIndex * 50}ms`}
      onClick={() => linkClickHandler(item.id, item.userId)}
      active={itemIndex === currentlyActiveIndex}
    >
      <MemberIdCell memberId={item.userId}>{item.userId}</MemberIdCell>
      <Table.Cell>{formattedDate}</Table.Cell>
      <Table.Cell>{item.type}</Table.Cell>
      <Table.Cell>{item.state}</Table.Cell>
      <Table.Cell>{item.reserve}</Table.Cell>
    </FadeInLinkRow>
  )
}

const sortTable = (
  clickedColumn: ClaimSortColumn,
  searchFilter: ClaimSearchFilter,
  claimsRequest: (filter: ClaimSearchFilter) => void,
) => {
  if (searchFilter.sortBy !== clickedColumn) {
    claimsRequest({ ...searchFilter, sortBy: clickedColumn, page: 0 })
  } else {
    claimsRequest({
      ...searchFilter,
      sortDirection: searchFilter.sortDirection === 'DESC' ? 'ASC' : 'DESC',
      page: 0,
    })
  }
}

const getTableHeader = (
  searchFilter: ClaimSearchFilter,
  claimsRequest: (filter: ClaimSearchFilter) => void,
) => {
  const { sortDirection, sortBy } = searchFilter
  const direction = sortDirection === 'DESC' ? 'descending' : 'ascending'
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={6}>Member id</Table.HeaderCell>
        <Table.HeaderCell
          width={6}
          sorted={sortBy === 'DATE' ? direction : undefined}
          onClick={() => sortTable('DATE', searchFilter, claimsRequest)}
        >
          Date
        </Table.HeaderCell>
        <Table.HeaderCell
          width={6}
          sorted={sortBy === 'TYPE' ? direction : undefined}
          onClick={() => sortTable('TYPE', searchFilter, claimsRequest)}
        >
          Type
        </Table.HeaderCell>
        <Table.HeaderCell
          width={6}
          sorted={sortBy === 'STATE' ? direction : undefined}
          onClick={() => sortTable('STATE', searchFilter, claimsRequest)}
        >
          State
        </Table.HeaderCell>
        <Table.HeaderCell
          width={6}
          sorted={sortBy === 'RESERVES' ? direction : undefined}
          onClick={() => sortTable('RESERVES', searchFilter, claimsRequest)}
        >
          Reserves
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}

const BackendServedClaimsList: React.SFC<BackendServedClaimsListProps> = ({
  claims: { searchResult, searchFilter },
  claimsRequest,
}) => {
  const [currentKeyboardNavigationStep] = useVerticalKeyboardNavigation({
    maxStep: searchResult.claims.length - 1,
    onPerformNavigation: (index) => {
      linkClickHandler(
        searchResult.claims[index].id,
        searchResult.claims[index].userId,
      )
    },
  })

  return (
    <BackendPaginatorList<Claim>
      pagedItems={searchResult.claims}
      itemContent={getTableRow(currentKeyboardNavigationStep)}
      tableHeader={getTableHeader(searchFilter, claimsRequest)}
      currentPage={searchResult.page}
      totalPages={searchResult.totalPages}
      isSortable={true}
      keyName="id"
      changePage={(page) => claimsRequest({ ...searchFilter, page })}
    />
  )
}

export default BackendServedClaimsList
