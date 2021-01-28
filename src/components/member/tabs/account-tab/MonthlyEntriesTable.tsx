import { IconButton } from '@material-ui/core'
import { MonthlyEntry } from 'api/generated/graphql'
import { format, parseISO } from 'date-fns'
import {
  getRemoveMonthlyEntryOptions,
  useRemoveMonthlyEntry,
} from 'graphql/use-remove-monthly-entry'
import { Popover } from 'hedvig-ui/popover'
import { Bold, Capitalized } from 'hedvig-ui/typography'
import React from 'react'
import { InfoCircleFill, Trash } from 'react-bootstrap-icons'
import styled from 'react-emotion'
import { Grid, Table } from 'semantic-ui-react'
import { WithShowNotification } from 'store/actions/notificationsActions'
import { formatMoney } from 'utils/money'
import { withShowNotification } from 'utils/notifications'

const StyledTable = styled(Table)`
  overflow: visible !important;
`

export const MonthlyEntriesTableComponent: React.FC<{
  memberId: string
  monthlyEntries: ReadonlyArray<MonthlyEntry>
} & WithShowNotification> = ({
  memberId,
  monthlyEntries,
  showNotification,
}) => {
  const [removeMonthlyEntry] = useRemoveMonthlyEntry()

  return (
    <StyledTable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>External Id</Table.HeaderCell>
          <Table.HeaderCell>Source</Table.HeaderCell>
          <Table.HeaderCell>Title</Table.HeaderCell>
          <Table.HeaderCell>Type</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell width={1}>Details</Table.HeaderCell>
          <Table.HeaderCell width={1} />
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {monthlyEntries.map((monthlyEntry) => {
          return (
            <Table.Row key={monthlyEntry.id}>
              <Table.Cell>{monthlyEntry.externalId ?? 'None'}</Table.Cell>
              <Table.Cell>
                <Capitalized>{monthlyEntry.source}</Capitalized>
              </Table.Cell>
              <Table.Cell>
                <Capitalized>{monthlyEntry.title}</Capitalized>
              </Table.Cell>
              <Table.Cell>
                <Capitalized>{monthlyEntry.type}</Capitalized>
              </Table.Cell>
              <Table.Cell>{formatMoney(monthlyEntry.amount)}</Table.Cell>
              <Table.Cell textAlign="center">
                <Popover
                  contents={
                    <Grid>
                      <Grid.Row>
                        <Grid.Column>
                          <Bold>ID</Bold>
                          <br />
                          {monthlyEntry.id}
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Bold>Added At</Bold>
                          <br />
                          {format(
                            parseISO(monthlyEntry.addedAt),
                            'yyyy-MM-dd HH:mm:ss',
                          )}
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Bold>Added By</Bold>
                          <br />
                          {monthlyEntry.addedBy}
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column>
                          <Bold>Comment</Bold>
                          <br />
                          {monthlyEntry.comment}
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                  }
                >
                  <InfoCircleFill />
                </Popover>
              </Table.Cell>
              <Table.Cell>
                <IconButton
                  onClick={() => {
                    const confirm = window.confirm(
                      `Are you sure you want delete the monthly entry titled "${monthlyEntry.title} (id=${monthlyEntry.id})?"`,
                    )
                    if (!confirm) {
                      return
                    }
                    removeMonthlyEntry(
                      getRemoveMonthlyEntryOptions(memberId, monthlyEntry.id),
                    )
                      .then(() => {
                        showNotification({
                          message: 'Monthly entry removed',
                          header: 'Success',
                          type: 'olive',
                        })
                      })
                      .catch((e) => {
                        showNotification({
                          message: e.message,
                          header: 'Error',
                          type: 'red',
                        })
                        throw e
                      })
                  }}
                >
                  <Trash color="red" />
                </IconButton>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    </StyledTable>
  )
}

export const MonthlyEntriesTable = withShowNotification(
  MonthlyEntriesTableComponent,
)
