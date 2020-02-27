import Pricing from 'features/pricing'
import { GET_INVENTORY, GET_CATEGORIES } from 'features/pricing/queries'
import { ADD_ITEM } from 'features/pricing/mutations'
import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import { Paper } from '../../../../shared/Paper'
import { InventoryList } from './InventoryList'
import { TextField } from '@material-ui/core'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
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

  getCurrentItem = () => {
    return {
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
    }
  }

  clearNewItem = () => {
    this.setState({
      itemName: '',
      itemValue: '',
      itemCategory: 'Övrigt',
    })
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

                          {
                            this.state.items.length !== 0 ?
                            <InventoryList
                            items={this.state.items}
                            claimId={this.props.claimId}
                            />
                            : <></>
                          }

                          <div style={{ display: 'flex'}}>
                            <TextField
                              id="item-name"
                              style={{ width: '46%' }}
                              color="secondary"
                              placeholder="New item"
                              name="itemName"
                              value={this.state.itemName}
                              onChange={this.handleChange}
                              onKeyPress={async (e) => {
                                if (e.key === 'Enter' && this.formLooksGood()) {
                                  e.target.blur()
                                  await addItem({
                                    variables: {
                                      item: this.getCurrentItem(),
                                    },
                                  })

                                  this.clearNewItem()
                                }
                              }}
                              helperText={
                                this.formLooksGood()
                                  ? 'Press Return to add item ↩'
                                  : ' '
                              }
                            />

                            <TextField
                              id="item-category"
                              select
                              color="secondary"
                              name="itemCategory"
                              style={{ width: '29%', marginLeft: '2%' }}
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
                              style={{ width: '21%', marginLeft: '2%' }}
                              color="secondary"
                              name="itemValue"
                              placeholder="Value"
                              align="right"
                              value={this.state.itemValue}
                              onChange={this.handleChange}
                              onKeyPress={async (e) => {
                                if (e.key === 'Enter' && this.formLooksGood()) {
                                  e.target.blur()
                                  await addItem({
                                    variables: {
                                      item: this.getCurrentItem(),
                                    },
                                  })

                                  this.clearNewItem()
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
