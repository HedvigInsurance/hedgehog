import { InventoryEntry } from 'components/claims/claim-details/components/inventory/InventoryEntry'
import * as React from 'react'
import { Table } from 'semantic-ui-react'

export class InventoryList extends React.Component {
  render() {
    return (
      <Table>
        {this.props.items.length !== 0 ? (
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
              <Table.HeaderCell width={4} />
            </Table.Row>
          </Table.Header>
        ) : null}

        <Table.Body>
          {this.props.items.map((item) => (
            <InventoryEntry
              key={item.inventoryItemId}
              item={item}
              claimId={this.props.claimId}
            />
          ))}
        </Table.Body>
      </Table>
    )
  }
}
