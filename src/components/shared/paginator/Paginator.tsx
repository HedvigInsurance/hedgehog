import { Button, ButtonsGroup } from 'hedvig-ui/button'
import { range } from 'lib/helpers'
import React from 'react'
import styled, { css } from 'react-emotion'
import { Table } from 'semantic-ui-react'

interface PageState {
  startPage: number
  endPage: number
}

const getPageLimits = (totalPages: number, currentPage: number): PageState => {
  let start = currentPage - 3
  let end = currentPage + 4

  if (start < 0) {
    end += -start
  }

  if (end > totalPages) {
    start -= end - totalPages
  }

  start = Math.max(start, 0)
  end = Math.min(end, totalPages)

  return {
    startPage: start,
    endPage: end,
  }
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const PageButton = styled(Button)<{ active: boolean }>`
  ${({ theme, active }) => css`
    background: ${active
      ? theme.highlightedButtonBackground
      : theme.defaultButtonBackground};
    color: ${theme.foreground};
  `}
`

export interface PaginatorProps<T> {
  pagedItems: T[]
  itemContent: (item: T, index: number) => React.ReactElement<any>
  tableHeader: React.ReactNode
  currentPage: number
  totalPages: number
  keyName?: keyof T
  onChangePage: (page: number) => void
}

export const Paginator = <T extends object>({
  onChangePage,
  currentPage,
  itemContent,
  keyName,
  pagedItems,
  tableHeader,
  totalPages,
}: PaginatorProps<T>) => {
  const { startPage, endPage } = getPageLimits(totalPages, currentPage)

  return (
    <>
      <Table celled selectable sortable>
        {tableHeader}
        {pagedItems.length > 0 && (
          <Table.Body>
            {pagedItems.map((item, index) => (
              <React.Fragment key={keyName ? '' + item[keyName] : index}>
                {itemContent(item, index)}
              </React.Fragment>
            ))}
          </Table.Body>
        )}
      </Table>
      {totalPages > 1 && (
        <ButtonWrapper>
          <ButtonsGroup style={{ justifyContent: 'center' }}>
            <Button
              disabled={currentPage === 0}
              onClick={() => onChangePage(0)}
            >
              First
            </Button>
            {range(startPage, endPage).map((page, id) => (
              <PageButton
                key={id}
                active={currentPage === page}
                onClick={() => onChangePage(page)}
              >
                {page + 1}
              </PageButton>
            ))}
            <Button
              disabled={currentPage === totalPages - 1}
              onClick={() => onChangePage(totalPages - 1)}
            >
              Last
            </Button>
          </ButtonsGroup>
        </ButtonWrapper>
      )}
    </>
  )
}
