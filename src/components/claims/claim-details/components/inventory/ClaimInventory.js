import Pricing from 'features/pricing'
import { GET_INVENTORY, GET_CATEGORIES } from 'features/pricing/queries'
import { ADD_ITEM } from 'features/pricing/mutations'
import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import { Paper } from '../../../../shared/Paper'
import { InventoryList } from './InventoryList'
import { TextField } from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'

export class ClaimInventory extends React.Component {
  state = {
    itemName: '',
    itemValue: '',
    itemCategory: 'Övrigt',
    items: [],
  }

  handleChange = (event) => {
    const {
      target: { name, value },
    } = event
    this.setState(() => ({ [name]: value }))
  }

  formLooksGood = () => {
    return (
      /^[0-9]+$/.test(this.state.itemValue) &&
      this.state.itemValue !== '' &&
      this.state.itemCategory !== 'None' &&
      this.state.itemName !== ''
    )
  }

  render() {
    return (
      <Mutation
        mutation={ADD_ITEM}
        refetchQueries={() => [
          {
            query: GET_INVENTORY,
            variables: { claimId: this.props.claimId },
          },
        ]}
      >
        {(addItem, addItemMutation) => {
          if (addItemMutation.error) {
            return <React.Fragment />
          }

          return (
            <Query query={GET_CATEGORIES}>
              {({
                data: dataCategories,
                loading: loadingCategories,
                error: errorCategories,
              }) => {
                return (
                  <Query
                    query={GET_INVENTORY}
                    variables={{
                      claimId: this.props.claimId,
                    }}
                  >
                    {({
                      data: dataInventory,
                      loading: loadingInventory,
                      error: errorInventory,
                    }) => {
                      if (!loadingInventory) {
                        if (!errorInventory) {
                          if (typeof dataInventory !== 'undefined') {
                            if ('inventory' in dataInventory) {
                              if (
                                this.state.items !== dataInventory.inventory
                              ) {
                                this.setState({
                                  items: dataInventory.inventory,
                                })
                              }
                            }
                          }
                        }
                      }

                      return (
                        <Paper>
                          <div>
                            <h3>Inventory</h3>
                          </div>
                          <InventoryList
                            items={this.state.items}
                            claimId={this.props.claimId}
                          />

                          <div style={{ display: 'inline-flex' }}>
                            <TextField
                              id="item-name"
                              style={{ width: '48%' }}
                              color="secondary"
                              label="Item"
                              name="itemName"
                              value={this.state.itemName}
                              onChange={this.handleChange}
                              helperText={this.formLooksGood() ? 'Press Return to add item ↩' : ' '}
                            />

                            <TextField
                              id="item-category"
                              select
                              color="secondary"
                              label="Category"
                              name="itemCategory"
                              style={{ width: '25%', marginLeft: '2%' }}
                              value={this.state.itemCategory}
                              onChange={this.handleChange}
                            >
                              <MenuItem value="Övrigt">Övrigt</MenuItem>

                              {loadingCategories || errorCategories ? (
                                <MenuItem value="Övrigt">Övrigt</MenuItem>
                              ) : (
                                dataCategories.categories.map((category) => (
                                  <MenuItem
                                    key={category.id}
                                    value={category.name}
                                  >
                                    {category.name}
                                  </MenuItem>
                                ))
                              )}
                            </TextField>

                            <TextField
                              id="item-value"
                              style={{ width: '18%', marginLeft: '2%' }}
                              color="secondary"
                              label="Value"
                              name="itemValue"
                              value={this.state.itemValue}
                              onChange={this.handleChange}
                              onKeyPress={async (e) => {
                                if (e.key === 'Enter') {
                                  console.log('Adding item...')
                                  await addItem({
                                    variables: {
                                      item: {
                                        inventoryItemId: null,
                                        claimId: this.props.claimId,
                                        itemName: this.state.itemName,
                                        categoryName: this.state.itemCategory,
                                        categoryId: '-1',
                                        value: this.state.itemValue,
                                        source: 'Custom',
                                        upperRange: null,
                                        lowerRange: null,
                                        itemId: null,
                                        filters: [],
                                      },
                                    },
                                  })
                                }
                              }}
                            />
                          </div>
                        </Paper>
                      )
                    }}
                  </Query>
                )
              }}
            </Query>
          )
        }}
      </Mutation>
    )
  }
}
