import { REMOVE_ITEM } from 'features/pricing/mutations'
import {
  GET_INVENTORY,
  GET_INVENTORY_ITEM_FILTERS,
} from 'features/pricing/queries'
import { formatMoney } from 'lib/intl'
import * as React from 'react'
import { Mutation, Query } from 'react-apollo'
import { Icon, Label, Popup, Table } from 'semantic-ui-react'

export class InventoryEntry extends React.Component {

  truncateItemName(word, n, useWordBoundary) {
    if (word.length <= n) {
      return word
    }
    const subString = word.substr(0, n - 1)
    return (
      (useWordBoundary
        ? subString.substr(0, subString.lastIndexOf(' '))
        : subString) + '...'
    )
  }

  render() {
    const {
      inventoryItemId,
      itemName,
      categoryName,
      value,
      source,
      upperRange,
      lowerRange,
      itemId,
    } = this.props.item

    return (
      <Table.Row>
        <Table.Cell>{this.truncateItemName(itemName, 25, true)}</Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          <Label basic color="blue">
            {formatMoney(
              'sv-SE',
              0,
            )({
              amount: value,
              currency: 'SEK',
            })}
          </Label>
        </Table.Cell>
        <Table.Cell textAlign="center" verticalAlign="middle">
          <Popup
            inverted
            wide
            trigger={<Icon color="blue" name="info circle" />}
            on="hover"
          >
            <Popup.Content>
              <Table color="black" key="black" inverted>
                <Table.Body>
                  <Table.Row>
                    <Table.Cell textAlign="right">Category:</Table.Cell>
                    <Table.Cell>{categoryName}</Table.Cell>
                  </Table.Row>

                  {upperRange !== null && lowerRange !== null ? (
                    <Table.Row>
                      <Table.Cell textAlign="right">Range:</Table.Cell>
                      <Table.Cell>
                        <Label size="small" basic color="blue">
                          {formatMoney(
                            'sv-SE',
                            0,
                          )({
                            amount: lowerRange,
                            currency: 'SEK',
                          }) +
                            ' - ' +
                            formatMoney(
                              'sv-SE',
                              0,
                            )({
                              amount: upperRange,
                              currency: 'SEK',
                            })}
                        </Label>
                      </Table.Cell>
                    </Table.Row>
                  ) : (
                    <React.Fragment />
                  )}

                  <Table.Row>
                    <Table.Cell textAlign="right">Source:</Table.Cell>
                    <Table.Cell>{source}</Table.Cell>
                  </Table.Row>

                  {itemId !== null ? (
                    <Table.Row>
                      <Table.Cell textAlign="right">Item ID:</Table.Cell>
                      <Table.Cell>{itemId}</Table.Cell>
                    </Table.Row>
                  ) : (
                    <React.Fragment />
                  )}
                </Table.Body>
              </Table>
            </Popup.Content>
          </Popup>

          <Query
            query={GET_INVENTORY_ITEM_FILTERS}
            variables={{ inventoryItemId }}
          >
            {({ loading, data, error }) => {
              if (loading) {
                return null
              }
              if (error) {
                return null
              }

              if (data) {
                if (!data.inventoryItemFilters) {
                  return null
                }
              }

              return (
                <Popup
                  inverted
                  wide
                  trigger={<Icon color="teal" name="tags" />}
                  on="hover"
                >
                  <Popup.Content>
                    <Table color="black" key="black" inverted>
                      <Table.Body>
                        {data.inventoryItemFilters.map((filter) => (
                          <Table.Row key={filter.name + filter.value}>
                            <Table.Cell textAlign="right">
                              {filter.name}:
                            </Table.Cell>
                            <Table.Cell>{filter.value}</Table.Cell>
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Popup.Content>
                </Popup>
              )
            }}
          </Query>

        </Table.Cell>
      </Table.Row>
    )
  }
}
