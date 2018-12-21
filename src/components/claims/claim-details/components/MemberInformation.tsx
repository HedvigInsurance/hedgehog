import * as React from 'react'
import styled from 'react-emotion'

import {
  Ban,
  Checkmark,
  Cross,
  QuestionMark,
  RedQuestionMark,
  ThumpsUp,
} from '../../../icons'

import { Paper } from '../../../shared/Paper'

export enum SanctionStatus {
  Undetermined = 'Undetermined',
  NoHit = 'NoHit',
  PartialHit = 'PartialHit',
  FullHit = 'FullHit',
}

interface MemberInformationProps {
  member: {
    firstName: string
    lastName: string
    personalNumber: string
    address: string
    postalNumber: string
    city: string
    directDebitStatus: {
      activated: boolean
    }
    sanctionStatus: SanctionStatus
  }
}

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

const MemberInformation: React.SFC<MemberInformationProps> = ({
  member: {
    firstName,
    lastName,
    personalNumber,
    address,
    postalNumber,
    city,
    directDebitStatus: { activated },
    sanctionStatus,
  },
}) => (
  <Paper>
    <h3>Member Information</h3>
    <MemberName>
      {firstName} {lastName}
    </MemberName>
    <p>Personal Number: {personalNumber}</p>
    <p>
      Address: {address}, {postalNumber} {city}
    </p>
    <p>Direct Debit: {activated ? <Checkmark /> : <Cross />}</p>
    <p>
      SanctionStatus: {sanctionStatus}{' '}
      <SanctionStatusIcon status={sanctionStatus} />
    </p>
  </Paper>
)

export { MemberInformation }
