import { AgreementStatus, GenericAgreement } from 'api/generated/graphql'
import React from 'react'
import styled, { css } from 'react-emotion'
import { Table } from 'semantic-ui-react'
import { InsuranceStatusBadge } from 'utils/agreement'
import { formatMoney } from 'utils/money'
import { convertEnumToTitle } from 'utils/text'

const SelectableTableRow = styled(Table.Row)({
  cursor: 'pointer',
})

const SelectableTableCell = styled(Table.Cell)<{
  selected: boolean
  status: AgreementStatus
}>`
  font-size: 1.2rem;
  ${({ selected, theme }) =>
    selected &&
    css`
      background: ${theme.accent} !important;
      color: ${theme.accentContrast} !important;
    `};
  width: 20%;
`

export const AgreementsTable: React.FC<{
  agreements: ReadonlyArray<GenericAgreement>
  selectedAgreement: string | undefined
  setSelectedAgreement: (agreementId: string | undefined) => void
}> = ({ agreements, selectedAgreement, setSelectedAgreement }) => {
  return (
    <Table celled unstackable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Line of Business</Table.HeaderCell>
          <Table.HeaderCell>From Date</Table.HeaderCell>
          <Table.HeaderCell>To Date</Table.HeaderCell>
          <Table.HeaderCell>Premium</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {agreements.map((agreement) => {
          const isSelected = agreement.id === selectedAgreement
          return (
            <SelectableTableRow
              singleLine
              key={agreement.id}
              onClick={() =>
                selectedAgreement === agreement.id
                  ? setSelectedAgreement(undefined)
                  : setSelectedAgreement(agreement.id)
              }
              active={isSelected}
            >
              <SelectableTableCell
                selected={isSelected}
                status={agreement.status}
              >
                {convertEnumToTitle(agreement.lineOfBusinessName)}
              </SelectableTableCell>
              <SelectableTableCell
                selected={isSelected}
                status={agreement.status}
              >
                {agreement.fromDate}
              </SelectableTableCell>
              <SelectableTableCell
                selected={isSelected}
                status={agreement.status}
              >
                {agreement.toDate}
              </SelectableTableCell>
              <SelectableTableCell
                selected={isSelected}
                status={agreement.status}
              >
                {formatMoney(agreement.premium)}
              </SelectableTableCell>
              <SelectableTableCell
                selected={isSelected}
                status={agreement.status}
              >
                <InsuranceStatusBadge status={agreement.status}>
                  {convertEnumToTitle(agreement.status)}
                </InsuranceStatusBadge>
              </SelectableTableCell>
            </SelectableTableRow>
          )
        })}
      </Table.Body>
    </Table>
  )
}
