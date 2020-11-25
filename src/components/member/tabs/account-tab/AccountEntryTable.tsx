import { AccountEntry } from 'api/generated/graphql'
import { Popover } from 'hedvig-ui/popover'
import { Bold, Capitalized, Placeholder } from 'hedvig-ui/typography'
import React from 'react'
import { InfoCircleFill } from 'react-bootstrap-icons'
import styled from 'react-emotion'
import { Grid, Table } from 'semantic-ui-react'
import { formatMoney } from 'utils/money'

const getAccountEntryColor = (theme, entry: AccountEntry) => {
  if (entry.failedAt) {
    return theme.danger
  }

  if (parseFloat(entry.amount.amount) < 0) {
    return theme.warning
  }

  return theme.backgroundTransparent
}

const FirstCell = styled(Table.Cell)<{ entry: AccountEntry }>`
  border-left: 7px solid
    ${({ theme, entry }) => getAccountEntryColor(theme, entry)} !important;
`

const StyledTable = styled(Table)`
  overflow: visible !important;
`

export const AccountEntryTable: React.FC<{
  accountEntries: AccountEntry[]
}> = ({ accountEntries }) => {
  return (
    <StyledTable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell width={1}>Details</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {accountEntries.map((entry) => (
          <Table.Row key={entry.id}>
            <FirstCell entry={entry}>{entry.fromDate}</FirstCell>
            <Table.Cell>
              <Capitalized>{entry.type}</Capitalized>
            </Table.Cell>
            <Table.Cell>
              {entry.title && entry.title !== '' ? (
                entry.title
              ) : (
                <Placeholder>Not specified</Placeholder>
              )}
            </Table.Cell>
            <Table.Cell>
              {formatMoney(entry.amount, {
                useGrouping: true,
                minimumFractionDigits: 2,
              })}
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Popover
                contents={
                  <Grid>
                    <Grid.Row>
                      <Grid.Column>
                        <Bold>Entry ID</Bold>
                        <br />
                        {entry.id}
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Bold>Reference</Bold>
                        <br />
                        {entry.reference}
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column>
                        <Bold>Source</Bold>
                        <br />
                        {entry.source}
                      </Grid.Column>
                    </Grid.Row>
                    {entry.comment && (
                      <Grid.Row>
                        <Grid.Column>
                          <Bold>Comment</Bold>
                          <br />
                          {entry.comment}
                        </Grid.Column>
                      </Grid.Row>
                    )}
                  </Grid>
                }
              >
                <InfoCircleFill />
              </Popover>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </StyledTable>
  )
}
