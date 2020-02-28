import { colorsV2 } from '@hedviginsurance/brand'
import {
  GetSwitcherEmailsDocument,
  Member,
  SwitchableSwitcherEmail,
  useGetSwitcherEmailsQuery,
  useMarkSwitcherEmailAsRemindedMutation,
} from 'api/generated/graphql'
import { format, parseISO } from 'date-fns'
import { Button } from 'hedvig-ui/button'
import { MainHeadline } from 'hedvig-ui/typography'
import * as React from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const ONE_DAY_IN_MILLIS = 3600 * 24 * 1000
const FORMAT_DATE_TIME = 'yyyy-MM-dd HH:mm'

export const shouldHighlight = (
  sentAt?: Date | null,
  remindedAt?: Date | null,
): boolean => {
  if (!sentAt) {
    return false
  }
  const sentAtLongAgo = Date.now() - (sentAt as any) > ONE_DAY_IN_MILLIS * 7

  if (!remindedAt) {
    return sentAtLongAgo
  }

  const remindedAtLongAgo =
    Date.now() - (remindedAt as any) > ONE_DAY_IN_MILLIS * 7

  return remindedAtLongAgo
}

export const shouldMute = (
  sentAt?: Date | null,
  remindedAt?: Date | null,
): boolean => {
  if (!sentAt) {
    return false
  }

  const sentAtRecently = Date.now() - (sentAt as any) <= ONE_DAY_IN_MILLIS * 3

  if (!remindedAt) {
    return sentAtRecently
  }

  const remindedRecently =
    Date.now() - (remindedAt as any) <= ONE_DAY_IN_MILLIS * 3

  return remindedRecently
}

export const StatusTableRow = styled(Table.Row, {
  shouldForwardProp: (prop) => !['highlighted', 'muted'].includes(prop),
})<{
  muted?: boolean
  highlighted?: boolean
}>`
  ${({ muted }) =>
    muted
      ? css`
          opacity: 0.5;
        `
      : ''};
  ${({ highlighted }) =>
    highlighted
      ? css`
          background-color: ${colorsV2.sunflower300};
        `
      : ''};
`

export const SwitcherEmailRow: React.FC<Pick<
  SwitchableSwitcherEmail,
  'id' | 'member' | 'sentAt' | 'remindedAt' | 'switcherCompany'
>> = ({ id, member, sentAt, remindedAt, switcherCompany }) => {
  const [
    markAsReminded,
    markAsRemindedOptions,
  ] = useMarkSwitcherEmailAsRemindedMutation({
    variables: { id },
    refetchQueries: () => [{ query: GetSwitcherEmailsDocument }],
  })

  const sentAtDate = sentAt && parseISO(sentAt)
  const remindedAtDate = remindedAt && parseISO(remindedAt)
  const signedDate = member.signedOn && parseISO(member.signedOn)

  return (
    <StatusTableRow
      highlighted={shouldHighlight(sentAtDate, remindedAtDate)}
      muted={shouldMute(sentAtDate, remindedAtDate)}
    >
      <Table.Cell>
        <Link to={`/members/${member.memberId}`}>{member.memberId}</Link>
        <>
          {' '}
          ({member.firstName} {member.lastName})
        </>
      </Table.Cell>
      <Table.Cell>{switcherCompany}</Table.Cell>
      <Table.Cell>
        {'📝 '}
        {signedDate ? format(signedDate, FORMAT_DATE_TIME) : '-'}
      </Table.Cell>
      <Table.Cell>
        {'💌 '}
        {sentAtDate ? format(sentAtDate, FORMAT_DATE_TIME) : '-'}
      </Table.Cell>
      <Table.Cell>
        {remindedAtDate ? (
          <>Reminded {format(remindedAtDate, FORMAT_DATE_TIME)}</>
        ) : (
          <Button
            size="small"
            variation="secondary"
            disabled={markAsRemindedOptions.loading}
            onClick={() => {
              if (
                confirm(
                  `Did you remind ${switcherCompany} about ${member.memberId}?`,
                )
              ) {
                markAsReminded()
              }
            }}
          >
            {markAsRemindedOptions.loading ? '...' : 'Mark as reminded'}
          </Button>
        )}
      </Table.Cell>
    </StatusTableRow>
  )
}

export const SwitcherAutomation: React.FC = () => {
  const switchers = useGetSwitcherEmailsQuery()

  return (
    <>
      <MainHeadline>🏡 Switcher automation</MainHeadline>
      {switchers.loading ? (
        <>Loading...</>
      ) : (
        <Table>
          <Table.Header>
            <StatusTableRow>
              <Table.HeaderCell>Member</Table.HeaderCell>
              <Table.HeaderCell>Current Insurer</Table.HeaderCell>
              <Table.HeaderCell>Sign date</Table.HeaderCell>
              <Table.HeaderCell>Sent date</Table.HeaderCell>
              <Table.HeaderCell>Sent reminder</Table.HeaderCell>
            </StatusTableRow>
          </Table.Header>
          <Table.Body>
            {switchers.data?.switchableSwitcherEmails?.map((email) => (
              <SwitcherEmailRow
                key={email.id}
                {...email}
                member={email.member as Member}
              />
            )) ?? null}
          </Table.Body>
        </Table>
      )}
    </>
  )
}
