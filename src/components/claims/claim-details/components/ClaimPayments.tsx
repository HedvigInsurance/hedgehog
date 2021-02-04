import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableHead as MuiTableHead,
  TableRow as MuiTableRow,
  withStyles,
} from '@material-ui/core'
import { Claim, Identity, SanctionStatus } from 'api/generated/graphql'
import { format, parseISO } from 'date-fns'

import React from 'react'
import { Market } from 'types/enums'

import { MonetaryAmount } from '../../../../lib/helpers'
import { Checkmark, Cross } from '../../../icons'
import { Paper } from '../../../shared/Paper'
import { ClaimPayment } from './ClaimPayment'
import { ClaimReserves } from './ClaimReserves'
import styled from 'react-emotion'

interface Props {
  payments: NonNullable<Claim['payments']>
  claimId: string
  reserves: MonetaryAmount
  sanctionStatus: SanctionStatus
  refetchPage: () => Promise<any>
  identity: Identity | null
  market: string | null
}

const PaymentTable = withStyles({
  root: {
    marginTop: '1rem',
  },
})(MuiTable)

const PaymentTableCell = withStyles({
  root: {
    fontSize: '1rem',
  },
})(MuiTableCell)

const TotalCell = styled(MuiTableCell)(({ theme }) => ({
  backgroundColor: theme.accentThird,
  fontSize: '1rem',
}))

const ClaimPayments: React.SFC<Props> = ({
  payments,
  claimId,
  reserves,
  sanctionStatus,
  refetchPage,
  identity,
  market,
}) => {
  let totalAmount = payments
    .map((payment) => +payment?.amount?.amount)
    .reduce((acc, amount) => acc + amount, 0)
  let totalDeductible = payments
    .map((payment) => +payment?.deductible?.amount)
    .reduce((acc, amount) => acc + amount, 0)

  return (
    <Paper>
      <h3>Payments</h3>
      {market === Market.Norway && (
        <p>
          <strong>Identified: {identity ? <Checkmark /> : <Cross />}</strong>
          <br />
          {identity && (
            <p>
              <strong>Personal Number: </strong>
              {identity.nationalIdentification.identification}
              {identity.firstName && identity.lastName && (
                <p>
                  <strong>Name:</strong> {identity.firstName}{' '}
                  {identity.lastName}
                </p>
              )}
            </p>
          )}
        </p>
      )}
      <ClaimReserves
        claimId={claimId}
        reserves={reserves}
        refetchPage={refetchPage}
      />

      <PaymentTable>
        <MuiTableHead>
          <MuiTableRow>
            <PaymentTableCell>Id</PaymentTableCell>
            <PaymentTableCell>Amount</PaymentTableCell>
            <PaymentTableCell>Deductible</PaymentTableCell>
            <PaymentTableCell>Note</PaymentTableCell>
            <PaymentTableCell>Date</PaymentTableCell>
            <PaymentTableCell>Ex Gratia</PaymentTableCell>
            <PaymentTableCell>Type</PaymentTableCell>
            <PaymentTableCell>Status</PaymentTableCell>
          </MuiTableRow>
        </MuiTableHead>
        <MuiTableBody>
          {payments.map((payment) => (
            <MuiTableRow
              key={
                payment!.amount.amount +
                payment!.amount.currency +
                payment!.timestamp
              }
            >
              <PaymentTableCell>{payment!.id}</PaymentTableCell>
              <PaymentTableCell>
                {payment!.amount.amount}&nbsp;{payment!.amount.currency}
              </PaymentTableCell>
              <PaymentTableCell>
                {payment!.deductible.amount}&nbsp;{payment!.deductible.currency}
              </PaymentTableCell>
              <PaymentTableCell>{payment!.note}</PaymentTableCell>
              <PaymentTableCell>
                {format(parseISO(payment!.timestamp), 'yyyy-MM-dd HH:mm:ss')}
              </PaymentTableCell>
              <PaymentTableCell>
                {payment!.exGratia ? <Checkmark /> : <Cross />}
              </PaymentTableCell>
              <PaymentTableCell>{payment!.type}</PaymentTableCell>
              <PaymentTableCell>{payment!.status}</PaymentTableCell>
            </MuiTableRow>
          ))}
          {totalAmount > 0 && (
            <>
              <MuiTableRow>
                <TotalCell>
                  <b>Amount Total: </b>
                </TotalCell>
                <TotalCell align="right">
                  {totalAmount.toFixed(2)}&nbsp;{payments[0]!.amount.currency}
                </TotalCell>
              </MuiTableRow>
              <MuiTableRow>
                <TotalCell>
                  <b>Deductible Total: </b>
                </TotalCell>
                <TotalCell align="right">
                  {totalDeductible.toFixed(2)}&nbsp;
                  {payments[0]!.deductible.currency}
                </TotalCell>
              </MuiTableRow>
            </>
          )}
        </MuiTableBody>
      </PaymentTable>

      <ClaimPayment
        sanctionStatus={sanctionStatus}
        claimId={claimId}
        refetchPage={refetchPage}
        identified={!!identity}
        market={market}
      />
    </Paper>
  )
}

export { ClaimPayments }
