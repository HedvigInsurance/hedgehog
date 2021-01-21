import styled from 'react-emotion'
import { List, Table } from 'semantic-ui-react'

export const ListPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0;
`

export const ItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const LinkRow = styled(Table.Row)`
  &&& {
    cursor: pointer;
  }
`

export const ScrollList = styled(List)`
  &&& {
    max-height: 200px;
    overflow-y: scroll;
  }
`
