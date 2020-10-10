import { LinkRow } from 'components/shared'
import { parseISO } from 'date-fns'
import formatDate from 'date-fns/format'
import isValidDate from 'date-fns/isValid'
import { useClaimSearch } from 'graphql/use-claim-search'
import React, { Dispatch } from 'react'
import styled from 'react-emotion'
import { Table } from 'semantic-ui-react'
import { Claim, ClaimSearchOptions } from 'src/api/generated/graphql'
import { history } from 'store'
import { ClaimSortColumn } from 'store/types/claimsTypes'
import { getMemberIdColor } from 'utils/member'
import { formatMoney } from 'utils/money'
import BackendPaginatorList from '../../shared/paginator-list/BackendPaginatorList'

const MemberIdCell = styled(Table.Cell)<{ memberId: string }>(
  ({ memberId }) => ({
    borderLeft: `7px solid ${getMemberIdColor(memberId)} !important`,
  }),
)

const linkClickHandler = (id: string, userId: string) => {
  history.push(`/claims/${id}/members/${userId}`)
}

const getTableRow = (item: Claim) => {
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

const sortTable = (
  clickedColumn: ClaimSortColumn,
  searchFilter: ClaimSearchOptions,
  setSearchFilter: Dispatch<ClaimSearchOptions>,
) => {
  if (searchFilter.sortBy !== clickedColumn) {
    setSearchFilter({ ...searchFilter, sortBy: clickedColumn, page: 0 })
  } else {
    setSearchFilter({
      ...searchFilter,
      sortDirection: searchFilter.sortDirection === 'DESC' ? 'ASC' : 'DESC',
      page: 0,
    })
  }
}

const getTableHeader = (
  searchFilter: ClaimSearchOptions,
  setSearchFilter: Dispatch<ClaimSearchOptions>,
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
          onClick={() => sortTable('DATE', searchFilter, setSearchFilter)}
        >
          Date
        </Table.HeaderCell>
        <Table.HeaderCell
          width={6}
          sorted={sortBy === 'TYPE' ? direction : undefined}
          onClick={() => sortTable('TYPE', searchFilter, setSearchFilter)}
        >
          Type
        </Table.HeaderCell>
        <Table.HeaderCell
          width={6}
          sorted={sortBy === 'STATE' ? direction : undefined}
          onClick={() => sortTable('STATE', searchFilter, setSearchFilter)}
        >
          State
        </Table.HeaderCell>
        <Table.HeaderCell
          width={6}
          sorted={sortBy === 'RESERVES' ? direction : undefined}
          onClick={() => sortTable('RESERVES', searchFilter, setSearchFilter)}
        >
          Reserves
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  )
}

const BackendServedClaimsList: React.FC = () => {
  const [claimSearch, { loading, data, error }] = useClaimSearch()
  const [searchFilter, setSearchFilter] = React.useState<ClaimSearchOptions>({
    page: 0,
    pageSize: 20,
    sortBy: 'DATE',
    sortDirection: 'DESC',
  })

  React.useEffect(() => {
    claimSearch(searchFilter)
  }, [searchFilter])

  if (loading) {
    return <>Loading...</>
  }

  if (error) {
    return <>D*shborad, could not retrieve claims!</>
  }

  return (
    <BackendPaginatorList<Claim>
      pagedItems={(data?.claimSearch?.claims as Claim[]) ?? []}
      itemContent={getTableRow}
      tableHeader={getTableHeader(searchFilter, setSearchFilter)}
      currentPage={data?.claimSearch?.page ?? 0}
      totalPages={data?.claimSearch?.totalPages ?? 0}
      isSortable={true}
      keyName="id"
      changePage={(page) => claimSearch({ ...searchFilter, page })}
    />
  )
}

export default BackendServedClaimsList
