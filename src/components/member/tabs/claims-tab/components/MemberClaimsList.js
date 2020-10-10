import { LinkRow } from 'components/shared'
import PaginatorList from 'components/shared/paginator-list/PaginatorList'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { Table } from 'semantic-ui-react'
import { history } from 'store'

export default class MemberClaimsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      column: null,
      direction: null,
    }
  }

  linkClickHandler = (id, userId) => {
    history.push(`/claims/${id}/members/${userId}`)
  }

  sortTable = (clickedColumn) => {
    const { column, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        direction: 'ascending',
      })
      this.props.sortClaimsList(clickedColumn, false)
      return
    }
    this.setState(
      {
        direction: direction === 'ascending' ? 'descending' : 'ascending',
      },
      () => {
        this.props.sortClaimsList(
          clickedColumn,
          this.state.direction === 'descending',
        )
      },
    )
  }

  getTableHeader = () => {
    const { column, direction } = this.state
    return (
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell
            width={6}
            sorted={column === 'date' ? direction : null}
            onClick={this.sortTable.bind(this, 'date')}
          >
            Date
          </Table.HeaderCell>
          <Table.HeaderCell
            width={6}
            sorted={column === 'type' ? direction : null}
            onClick={this.sortTable.bind(this, 'type')}
          >
            Type
          </Table.HeaderCell>
          <Table.HeaderCell
            width={6}
            sorted={column === 'state' ? direction : null}
            onClick={this.sortTable.bind(this, 'state')}
          >
            State
          </Table.HeaderCell>
          <Table.HeaderCell
            width={6}
            sorted={column === 'reserve' ? direction : null}
            onClick={this.sortTable.bind(this, 'reserve')}
          >
            Reserves
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    )
  }

  getTableRow = (item) => {
    const date = moment(item.date).local()
    const formattedDate = date.isValid()
      ? date.format('DD MMMM YYYY HH:mm')
      : '-'
    return (
      <LinkRow onClick={this.linkClickHandler.bind(this, item.id, item.userId)}>
        <Table.Cell>{formattedDate}</Table.Cell>
        <Table.Cell>{item.type}</Table.Cell>
        <Table.Cell>{item.state}</Table.Cell>
        <Table.Cell>{item.reserve}</Table.Cell>
      </LinkRow>
    )
  }

  render() {
    const {
      claims: { list },
    } = this.props
    return (
      <PaginatorList
        list={list}
        itemContent={(item) => this.getTableRow(item)}
        tableHeader={this.getTableHeader()}
        pageSize={20}
        isSortable={true}
        keyName="id"
      />
    )
  }
}

MemberClaimsList.propTypes = {
  claims: PropTypes.object.isRequired,
  sortClaimsList: PropTypes.func.isRequired,
}
