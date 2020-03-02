import gql from 'graphql-tag'
import moment from 'moment'
import React from 'react'
import { Mutation, Query } from 'react-apollo'
import { Button, Form, Input, Table } from 'semantic-ui-react'

import { Checkmark, Cross } from 'components/icons'
import PayoutDetails from 'components/payouts/payout-details'
import styled from 'react-emotion'
import { formatMoneySE } from 'lib/intl'

const transactionDateSorter = (a, b) => {
  const aDate = new Date(a.timestamp)
  const bDate = new Date(b.timestamp)

  if (aDate > bDate) {
    return 1
  }
  if (bDate > aDate) {
    return -1
  }
  return 0
}

const GET_MEMBER_QUERY = gql`
  query GetMemberTransactions(
    $id: ID!
    $currentMonth: YearMonth!
    $previousMonth: YearMonth!
  ) {
    member(id: $id) {
      directDebitStatus {
        activated
      }
      transactions {
        id
        amount
        timestamp
        type
        status
      }
      currentMonth: monthlySubscription(month: $currentMonth) {
        amount
      }
      previousMonth: monthlySubscription(month: $previousMonth) {
        amount
      }
    }
  }
`

const CHARGE_MEMBER_MUTATION = gql`
  mutation ChargeMember($id: ID!, $amount: MonetaryAmount!) {
    chargeMember(id: $id, amount: $amount) {
      transactions {
        id
        amount
        timestamp
        type
        status
      }
    }
  }
`
const TableRowColored = styled(Table.Row)(({ transaction }) => {
  if (transaction.type === 'CHARGE') {
    switch (transaction.status) {
      case 'INITIATED':
        return { backgroundColor: '#FFFFDD' } //Yellow
      case 'COMPLETED':
        return { backgroundColor: '#DDFFDD' } //Green
      case 'FAILED':
        return { backgroundColor: '#FF8A80' } //Red
    }
  }
})

// @ts-ignore
const MemberTransactionsTable = ({ transactions }) => (
  <Table celled compact>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Amount</Table.HeaderCell>
        <Table.HeaderCell>Timestamp</Table.HeaderCell>
        <Table.HeaderCell>Type</Table.HeaderCell>
        <Table.HeaderCell>Status</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {transactions.map((transaction) => (
        <TableRowColored key={transaction.id} transaction={transaction}>
          <Table.Cell>{transaction.id}</Table.Cell>
          <Table.Cell>
            <strong>{formatMoneySE(transaction.amount)}</strong>
          </Table.Cell>
          <Table.Cell>
            {moment(transaction.timestamp).format('YYYY-MM-DD HH:mm:ss')}
          </Table.Cell>
          <Table.Cell>{transaction.type}</Table.Cell>
          <Table.Cell>{transaction.status}</Table.Cell>
        </TableRowColored>
      ))}
    </Table.Body>
  </Table>
)
// @ts-ignore
class PaymentsTab extends React.Component {
  constructor(props) {
    super(props)
    this.variables = {
      id: props.match.params.id,
      currentMonth: moment().format('YYYY-MM'),
      previousMonth: moment()
        .subtract(1, 'month')
        .format('YYYY-MM'),
    }
    this.state = {
      amount: null,
      confirming: false,
      confirmed: false,
    }
  }

  handleChange = (e) => {
    this.setState({ amount: e.target.value })
  }

  handleChargeSubmit = (defaultAmount ) => (mutation) => () => {
    mutation({
      variables: {
        id: this.variables.id,
        amount: {
          amount:
            this.state.amount === null
              ? parseInt(defaultAmount, 10)
              : +this.state.amount,
          currency: 'SEK',
        },
      },
    })
    this.setState({ amount: null, confirming: false, confirmed: false })
  }

  handleConfirmation = () => {
    this.setState({ confirming: true })
  }

  handleConfirmationChange = (e) => {
    if (e.target.value.replace(/ /g, '').toLowerCase() === 'a') {
      this.setState({ confirming: false, confirmed: true })
    }
  }

  handleUpdate = (cache, result) => {
    const { transactions } = result.data.chargeMember
    cache.writeQuery({
      query: GET_MEMBER_QUERY,
      data: {
        member: {
          transactions,
        },
      },
    })
  }

  render() {
    return (
      <React.Fragment>
        <Query query={GET_MEMBER_QUERY} variables={this.variables}>
          {({ loading, error, data }) => {
            if (error) {
              return <div>Error!</div>
            }

            if (loading || !data) {
              return <div>Loading...</div>
            }

            return (
              <div>
                <p>
                  Direct Debit activated:{' '}
                  {data.member.directDebitStatus.activated ? (
                    <Checkmark />
                  ) : (
                    <Cross />
                  )}
                </p>
                <p>
                  Subscription cost for this month(
                  {this.variables.currentMonth}) is :{' '}
                  {data.member.currentMonth.amount.amount}{' '}
                  {data.member.currentMonth.amount.currency}
                </p>
                <p>
                  Subscription cost for the previous month (
                  {this.variables.previousMonth}) is :{' '}
                  {data.member.previousMonth.amount.amount}{' '}
                  {data.member.previousMonth.amount.currency}
                </p>
                <h3>Charge:</h3>
                {data.member.directDebitStatus.activated && (
                  <Mutation
                    mutation={CHARGE_MEMBER_MUTATION}
                    update={this.handleUpdate}
                  >
                    {(chargeMember) => (
                      <div>
                        <Form>
                          <Form.Input
                            onChange={this.handleChange}
                            label="Charge amount"
                            placeholder="ex. 100"
                            value={
                              this.state.amount === null
                                ? data.member.currentMonth.amount.amount
                                : this.state.amount
                            }
                          />
                          <br />
                          {!this.state.confirmed && (
                            <Button onClick={this.handleConfirmation}>
                              Charge
                            </Button>
                          )}
                          {this.state.confirming && (
                            <React.Fragment>
                              <br />
                              <br />
                              <Input
                                onChange={this.handleConfirmationChange}
                                focus
                                label="Type a to confirm"
                                placeholder="a"
                              />
                              <br />
                            </React.Fragment>
                          )}
                          {this.state.confirmed && (
                            <React.Fragment>
                              Success!! Press execute, to execute the order
                              <br />
                              <br />
                              <Button
                                positive
                                onClick={this.handleChargeSubmit(
                                  data.member.currentMonth.amount.amount,
                                )(chargeMember)}
                              >
                                Execute
                              </Button>
                            </React.Fragment>
                          )}
                        </Form>
                      </div>
                    )}
                  </Mutation>
                )}
                <br />
                <h3>Payout:</h3>
                <PayoutDetails {...this.props} />
                <h3>Transactions:</h3>
                <MemberTransactionsTable
                  transactions={data.member.transactions
                    .slice()
                    .sort(transactionDateSorter)
                    .reverse()}
                />
              </div>
            )
          }}
        </Query>
      </React.Fragment>
    )
  }
}

export default PaymentsTab