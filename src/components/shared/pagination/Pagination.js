import { getPageState } from 'lib/paginator'
import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'semantic-ui-react'
import styled from 'react-emotion'

const Paginator = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

export default class Pagination extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageState: {},
    }
  }

  setPage = (page) => {
    const { items, onChangePage, pageSize } = this.props

    const newPageState = getPageState(items.length, page, pageSize)
    const pageOfItems = items.slice(
      newPageState.startIndex,
      newPageState.endIndex + 1,
    )

    if (pageOfItems.length === 0) {
      this.setState({ pageState: newPageState })
      onChangePage(pageOfItems)
      return
    }
    if (page < 1 || page > newPageState.totalPages) {
      return
    }

    this.setState({ pageState: newPageState })
    onChangePage(pageOfItems)
  }

  componentWillMount() {
    const { items, initialPage } = this.props
    if (items && items.length) {
      this.setPage(initialPage)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.items !== prevProps.items) {
      this.setPage(this.props.initialPage)
    }
  }

  render() {
    const { pageState } = this.state

    return (
      <Paginator>
        {pageState.pages && pageState.pages.length > 1 && (
          <Button.Group>
            <Button
              disabled={pageState.currentPage === 1}
              onClick={this.setPage.bind(this, 1)}
            >
              First
            </Button>
            {pageState.pages.map((page, id) => (
              <Button
                key={id}
                className={pageState.currentPage === page ? 'active' : ''}
                onClick={this.setPage.bind(this, page)}
              >
                {page}
              </Button>
            ))}
            <Button
              disabled={pageState.currentPage === pageState.totalPages}
              onClick={this.setPage.bind(this, pageState.totalPages)}
            >
              Last
            </Button>
          </Button.Group>
        )}
      </Paginator>
    )
  }
}

Pagination.defaultProps = {
  initialPage: 1,
}

Pagination.propTypes = {
  items: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  initialPage: PropTypes.number,
}
