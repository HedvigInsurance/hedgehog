import { colors } from '@hedviginsurance/brand'
import { format } from 'date-fns'
import gql from 'graphql-tag'
import { FadeIn } from 'hedvig-ui/animations/fade-in'
import { LoadingMessage } from 'hedvig-ui/animations/standalone-message'
import { MainHeadline } from 'hedvig-ui/typography'
import { MonetaryAmount } from 'lib/helpers'
import React from 'react'
import { Mutation, Query } from 'react-apollo'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import actions from 'store/actions'
import { formatMoney } from 'utils/money'

const query = gql`
  query PaymentScheduleQuery($month: YearMonth!) {
    paymentSchedule(status: SUBSCRIPTION_SCHEDULED_AND_WAITING_FOR_APPROVAL) {
      id
      member {
        memberId
        firstName
        lastName
        monthlySubscription(month: $month) {
          amount
        }
        account {
          currentBalance {
            amount
            currency
          }
        }
      }
      status
      amount
    }
  }
`
const approveMemberCharge = gql`
  mutation approveMemberCharge($approvals: [MemberChargeApproval!]!) {
    approveMemberCharge(approvals: $approvals)
  }
`

const Wrapper = styled('div')({
  padding: '0 20px',
})

const TableRow = styled(Table.Row)((props: { warning: boolean }) => ({
  backgroundColor: props.warning ? 'yellow' : undefined,
}))

const ButtonWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
})

const Button = styled('button')({
  padding: '10px 15px',
  background: colors.GREEN,
  color: colors.WHITE,
  fontWeight: 600,
  border: 0,
  borderRadius: 5,
  fontSize: '1.2rem',
  transition: 'background 250ms',

  '&:hover, &:focus': {
    background: '#18cea1',
    cursor: 'pointer',
  },
})

const ConfirmMessage = styled('div')({
  padding: '12px',
  alignItems: 'center',
  color: colors.OFF_BLACK_DARK,
  fontSize: '1.2rem',
})

interface PaymentSchedule {
  id: string
  member: {
    memberId: string
    firstName: string
    lastName: string
    monthlySubscription: {
      amount: MonetaryAmount
    }
    account: {
      currentBalance: MonetaryAmount
    }
  }
  chargeStatus: string
  amount: MonetaryAmount
}

interface RowProps {
  paymentSchedule: PaymentSchedule[]
}

const Row: React.FunctionComponent<RowProps> = ({ paymentSchedule }) => (
  <>
    {paymentSchedule.map((payment) => (
      <TableRow
        key={payment.id}
        warning={
          payment.member?.account &&
          payment.member.monthlySubscription &&
          payment.member.account.currentBalance.amount !==
            payment.member.monthlySubscription.amount.amount
        }
      >
        <Table.Cell>
          {payment.member?.firstName + ' ' + payment.member?.lastName}
        </Table.Cell>
        <Table.Cell>
          <Link to={`/members/${payment.member?.memberId}`}>
            {payment.member?.memberId}
          </Link>
        </Table.Cell>
        <Table.Cell>
          {payment.member?.monthlySubscription?.amount &&
            formatMoney(payment.member.monthlySubscription.amount)}
        </Table.Cell>
        <Table.Cell>
          {payment.member?.account &&
            formatMoney(payment.member.account.currentBalance)}
          {payment.member?.account &&
            parseFloat(payment.member.account.currentBalance.amount) <= 0 &&
            " (Won't be charged)"}
        </Table.Cell>
      </TableRow>
    ))}
  </>
)

interface State {
  confirming: boolean
}

export class ChargePageComponent extends React.Component<
  {
    showNotification: (data: any) => void
  },
  State
> {
  public state = {
    confirming: false,
  }

  public render() {
    return (
      <Wrapper>
        <Query<any>
          query={query}
          variables={{ month: format(new Date(), 'yyyy-MM') }}
        >
          {({ loading, error, data }) => {
            if (error) {
              return (
                <Table.Row>
                  Error in GraphQl query here:{' '}
                  <pre>{JSON.stringify(error, null, 2)}</pre>
                </Table.Row>
              )
            }
            if (loading || !data || !data.paymentSchedule) {
              return <LoadingMessage paddingTop="10vh" />
            }
            return (
              <FadeIn>
                <MainHeadline>💰 Approve charges</MainHeadline>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Member Name</Table.HeaderCell>
                      <Table.HeaderCell>Member Id</Table.HeaderCell>
                      <Table.HeaderCell>Member Premium</Table.HeaderCell>
                      <Table.HeaderCell>Charge Amount</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    <Row paymentSchedule={data.paymentSchedule} />
                  </Table.Body>
                </Table>
                <ButtonWrapper>
                  <Mutation
                    mutation={approveMemberCharge}
                    refetchQueries={() => [
                      {
                        query,
                        variables: { month: format(new Date(), 'yyyy-MM') },
                      },
                    ]}
                  >
                    {(mutation, mutationProps) => {
                      return (
                        <Button
                          disabled={mutationProps.loading}
                          onClick={
                            this.state.confirming
                              ? () => {
                                  if (mutationProps.loading) {
                                    return
                                  }
                                  mutation({
                                    variables: {
                                      approvals: data.paymentSchedule.map(
                                        (payment) => ({
                                          memberId: payment.member.memberId,
                                          amount:
                                            payment.member.account
                                              .currentBalance,
                                        }),
                                      ),
                                    },
                                  })
                                    .then(() => {
                                      this.resetButton()
                                      this.props.showNotification({
                                        message: 'Charges sent for approval',
                                        header: 'Approved',
                                        type: 'olive',
                                      })
                                    })
                                    .catch((error_) => {
                                      this.props.showNotification({
                                        message: error_.message,
                                        header: 'Error',
                                        type: 'red',
                                      })
                                      throw error_
                                    })
                                }
                              : this.confirm
                          }
                        >
                          {this.state.confirming ? "Yes, I'm sure" : 'Do it'}
                        </Button>
                      )
                    }}
                  </Mutation>
                  {this.state.confirming ? (
                    <ConfirmMessage>Are you sure?</ConfirmMessage>
                  ) : null}
                </ButtonWrapper>
              </FadeIn>
            )
          }}
        </Query>
      </Wrapper>
    )
  }

  private resetButton = () => {
    this.setState({ confirming: false })
  }
  private confirm = () => {
    this.setState({ confirming: true })
  }
}

const mapActions = { ...actions.notificationsActions }

export const ChargePage = connect(null, mapActions)(ChargePageComponent)
