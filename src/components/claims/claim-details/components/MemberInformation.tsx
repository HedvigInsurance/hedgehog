import { Contract, Member, SanctionStatus } from 'api/generated/graphql'
import { MemberFlag } from 'components/member/shared/member-flag'
import { formatDistance, parseISO } from 'date-fns'
import { FlagOrbIndicator } from 'hedvig-ui/orb-indicator'
import { FraudulentStatus } from 'lib/fraudulentStatus'
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'
import { currentAgreementForContract } from 'utils/contract'
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

const MemberInformation: React.FC<{
  member: Member
  contract: Contract | null
}> = ({ member, contract }) => {
  const address = contract && currentAgreementForContract(contract)?.address

  return (
    <Paper>
      <h3>Member Information</h3>
      <MemberName>
        {member.firstName} {member.lastName}{' '}
        <MemberFlag memberId={member.memberId} />
      </MemberName>
      <p>
        <strong>Id:</strong>{' '}
        <Link to={`/members/${member.memberId}`}>{member.memberId}</Link>
      </p>
      <p>
        <strong>Personal Number:</strong> {member.personalNumber}
      </p>
      {address && (
        <p>
          <strong>Address:</strong> {address.street}, {address.postalCode}{' '}
          {address.city}
        </p>
      )}

      <p>
        <strong>Sanction Status:</strong> {member.sanctionStatus}{' '}
        <SanctionStatusIcon status={member.sanctionStatus!} />
      </p>
      <h3>Fraud Checks</h3>
      <p>
        <strong>Signed:</strong>{' '}
        {Boolean(member.signedOn) &&
          formatDistance(parseISO(member.signedOn), new Date(), {
            addSuffix: true,
          })}
      </p>
      <p style={{ marginTop: '-7px' }}>
        <strong>Fraudulent Status:</strong>{' '}
        <span style={{ fontSize: '32px' }}>
          <FraudulentStatus stateInfo={{ state: member.fraudulentStatus }} />
        </span>
      </p>
      <p>
        <strong>Direct Debit:</strong>{' '}
        {member.directDebitStatus?.activated ? <Checkmark /> : <Cross />}
      </p>
      <p>
        <strong>Payments Balance (Minimum):</strong>{' '}
        {member.account?.totalBalance &&
          formatMoney(member.account.totalBalance)}
      </p>
      <p>
        <strong>Failed Payments:</strong>{' '}
        {member.numberFailedCharges?.numberFailedCharges} payment(s) in a row
      </p>
      <p>
        <strong>Total Number of Claims:</strong> {member.totalNumberOfClaims}
      </p>
      <p>
        <strong>Debt Status:</strong>{' '}
        {member.person && (
          <FlagOrbIndicator flag={member.person?.debtFlag} size={'tiny'} />
        )}
      </p>
    </Paper>
  )
}

export { MemberInformation }
