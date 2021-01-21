import React from 'react'
import { Table } from 'semantic-ui-react'

enum SortDirection {
  Ascending = 'ascending',
  Descending = 'descending',
}

enum ClaimSortColumn {
  Type = 'TYPE',
  Date = 'DATE',
  Reserve = 'RESERVE',
  State = 'STATE',
}

export const ClaimListHeader: React.FC<{
  onSort?: (column: ClaimSortColumn | null, direction?: SortDirection) => void
}> = ({ onSort }) => {
  const [column, setColumn] = React.useState<ClaimSortColumn | null>(null)
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(
    SortDirection.Descending,
  )

  const sortTable = (clickedColumn: ClaimSortColumn) => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn)
      setSortDirection(SortDirection.Ascending)

      if (onSort) {
        onSort(clickedColumn, SortDirection.Ascending)
      }

      return
    }

    setSortDirection(
      flippedDirection(sortDirection ?? SortDirection.Descending),
    )

    if (onSort) {
      onSort(clickedColumn, sortDirection)
    }
  }

  const flippedDirection = (direction: SortDirection) =>
    direction === SortDirection.Ascending
      ? SortDirection.Descending
      : SortDirection.Ascending

  return (
    <Table.Header>
      <Table.HeaderCell>Member ID</Table.HeaderCell>
      <Table.HeaderCell
        width={6}
        sorted={column === ClaimSortColumn.Date ? sortDirection : undefined}
        onClick={() => sortTable(ClaimSortColumn.Date)}
      >
        Date
      </Table.HeaderCell>
      <Table.HeaderCell
        width={6}
        sorted={column === ClaimSortColumn.Type ? sortDirection : undefined}
        onClick={() => sortTable(ClaimSortColumn.Type)}
      >
        Type
      </Table.HeaderCell>
      <Table.HeaderCell
        width={6}
        sorted={column === ClaimSortColumn.State ? sortDirection : undefined}
        onClick={() => sortTable(ClaimSortColumn.State)}
      >
        State
      </Table.HeaderCell>
      <Table.HeaderCell
        width={6}
        sorted={column === ClaimSortColumn.Reserve ? sortDirection : undefined}
        onClick={() => sortTable(ClaimSortColumn.Reserve)}
      >
        Reserves
      </Table.HeaderCell>
    </Table.Header>
  )
}
