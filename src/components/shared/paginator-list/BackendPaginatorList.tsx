import React from 'react'
import styled from 'react-emotion'
import { Table } from 'semantic-ui-react'
import BackendPagination from '../pagination/BackendPagination'

const PaginatorContainer = styled('div')`
  display: flex;
  justify-content: center;
  width: 100%;
`

export interface BackendPaginatorListProps<T> {
  pagedItems: T[]
  itemContent: (item: T) => React.ReactElement<any>
  tableHeader: React.ReactNode
  currentPage: number
  totalPages: number
  isSortable: boolean
  keyName?: keyof T
  changePage: (page: number) => void
}

export default class BackendPaginatorList<T> extends React.Component<
  BackendPaginatorListProps<T>,
  {}
> {
  public render() {
    const {
      pagedItems,
      itemContent,
      currentPage,
      totalPages,
      tableHeader,
      isSortable,
      keyName,
      changePage,
    } = this.props
    return (
      <React.Fragment>
        <Table celled selectable sortable={isSortable}>
          {tableHeader}
          {pagedItems.length ? (
            <Table.Body>
              {pagedItems.map((item, key) => (
                <React.Fragment key={keyName ? '' + item[keyName] : key}>
                  {itemContent(item)}
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
}
