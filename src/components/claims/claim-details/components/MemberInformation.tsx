import { Member, SanctionStatus } from 'api/generated/graphql'
import { MemberFlag } from 'components/member/shared/member-flag'
import { formatDistance, parseISO } from 'date-fns'
import { FraudulentStatus } from 'lib/fraudulentStatus'
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import { formatMoney } from 'utils/money'

import {
  Ban,
  Checkmark,
  Cross,
  QuestionMark,
  RedQuestionMark,
  ThumpsUp,
} from '../../../icons'

import { Paper } from '../../../shared/Paper'

const SanctionStatusIcon: React.SFC<{ status: SanctionStatus }> = ({
  status,
}) => {
  switch (status) {
    case SanctionStatus.Undetermined:
      return <QuestionMark />
    case SanctionStatus.NoHit:
      return <ThumpsUp />
    case SanctionStatus.PartialHit:
      return <RedQuestionMark />
    case SanctionStatus.FullHit:
      return <Ban />
    default:
      throw new Error('SanctionStatusPicker failed to map the status')
  }
}

const MemberName = styled('h2')({
  marginTop: 0,
  marginBottom: '2rem',
})

const MemberInformation: React.SFC<{ member: Member }> = ({ member }) => {
  return (
    <Paper>
      <h3>Member Information</h3>
      <MemberName>
        {member.firstName} {member.lastName}{' '}
        <MemberFlag memberId={member.memberId} />
      </MemberName>
      <p>
        <b>Id:</b>{' '}
        <Link to={`/members/${member.memberId}`}>{member.memberId}</Link>
      </p>
      <p>
        <b>Personal Number:</b> {member.personalNumber}
      </p>
      <p>
        <b>Address:</b> {member.address}, {member.postalNumber} {member.city}
      </p>
      <p>
        <b>Sanction Status:</b> {member.sanctionStatus}{' '}
        <SanctionStatusIcon status={member.sanctionStatus!} />
      </p>
      <h3>Fraud Checks</h3>
      <p>
        <b>Signed:</b>{' '}
        {Boolean(member.signedOn) &&
          formatDistance(parseISO(member.signedOn), new Date(), {
            addSuffix: true,
          })}
      </p>
      <p style={{ marginTop: '-7px' }}>
        <b>Fraudulent Status:</b>{' '}
        <span style={{ fontSize: '32px' }}>
          <FraudulentStatus stateInfo={{ state: member.fraudulentStatus }} />
        </span>
      </p>
      <p>
        <b>Direct Debit:</b>{' '}
        {member.directDebitStatus?.activated ? <Checkmark /> : <Cross />}
      </p>
      <p>
        <b>Payments Balance (Minimum):</b>{' '}
        {member.account?.totalBalance &&
          formatMoney(member.account.totalBalance)}
      </p>
      <p>
        <b>Failed Payments:</b>{' '}
        {member.numberFailedCharges?.numberFailedCharges} payment(s) in a row
      </p>
      <p>
        <b>Total Number of Claims:</b> {member.totalNumberOfClaims}
        {member.totalNumberOfClaims === 1 ? ' claim' : ' claims'}
      </p>
      <p style={{ marginTop: '-7px' }}>
        <b>Debt Status:</b>
        <span style={{ fontSize: '32px' }}>
          <FraudulentStatus
            stateInfo={{
              state: member.person.debtFlag
                .replace('GREEN', 'NOT_FRAUD')
                .replace('AMBER', 'SUSPECTED_FRAUD')
                .replace('RED', 'CONFIRMED_FRAUD'),
            }}
          />
        </span>
      </p>
    </Paper>
  )
}

export { MemberInformation }
