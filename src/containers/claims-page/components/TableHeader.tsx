import { ClaimSearchOptions } from 'api/generated/graphql'
import React, { Dispatch } from 'react'
import { Table } from 'semantic-ui-react'
import { ClaimSortColumn } from 'store/types/claimsTypes'

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

export const TableHeader: React.FC<{
  searchFilter: ClaimSearchOptions
  setSearchFilter: Dispatch<ClaimSearchOptions>
}> = ({ searchFilter, setSearchFilter }) => {
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
