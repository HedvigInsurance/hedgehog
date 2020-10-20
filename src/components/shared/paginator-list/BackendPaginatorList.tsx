import React from 'react'
import styled from 'react-emotion'
import { Table } from 'semantic-ui-react'
import BackendPagination from '../pagination/BackendPagination'

const PaginatorContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

export interface BackendPaginatorListProps<T> {
  pagedItems: T[]
  itemContent: (item: T, index: number) => React.ReactElement<any>
  tableHeader: React.ReactNode
  currentPage: number
  totalPages: number
  isSortable: boolean
  keyName?: keyof T
  changePage: (page: number) => void
}

const BackendPaginatorList = <T extends object>({
  changePage,
  currentPage,
  isSortable,
  itemContent,
  keyName,
  pagedItems,
  tableHeader,
  totalPages,
}: BackendPaginatorListProps<T>) => {
  return (
    <React.Fragment>
      <Table celled selectable sortable={isSortable}>
        {tableHeader}
        {pagedItems.length ? (
          <Table.Body>
            {pagedItems.map((item, index) => (
              <React.Fragment key={keyName ? '' + item[keyName] : index}>
                {itemContent(item, index)}
              </React.Fragment>
            ))}
          </Table.Body>
        ) : null}
      </Table>
      <PaginatorContainer>
        <BackendPagination
          currentPage={currentPage}
          totalPages={totalPages}
          changePage={changePage}
        />
      </PaginatorContainer>
    </React.Fragment>
  )
}

export default BackendPaginatorList
