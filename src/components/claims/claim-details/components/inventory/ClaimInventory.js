import Pricing from 'features/pricing'
import { GET_INVENTORY, GET_CATEGORIES } from 'features/pricing/queries'
import { ADD_ITEM, REMOVE_ITEM } from 'features/pricing/mutations'
import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import { Paper } from '../../../../shared/Paper'
import {
  TextField,
  Button,
  Grid,
  Select, Table, TableHead, TableRow, TableCell, TableBody, IconButton,
} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteForeverIcon from '@material-ui/icons/Delete'
import { formatMoney } from 'lib/intl'

class InventoryList extends React.Component {
  render() {
    return (
      <Table size="small" style={{marginBottom: "25px"}}>
        <colgroup>
          <col style={{ width: '45%' }} />
          <col style={{ width: '24%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '2%' }} />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableCell style={{ paddingLeft: '0px' }}>Item</TableCell>
            <TableCell style={{ paddingLeft: '0px' }}>Category</TableCell>
            <TableCell align="right" style={{ paddingLeft: '0px' }}>
              Value
            </TableCell>
            <TableCell style={{ paddingLeft: '0px' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.items.map((row) => (
            <TableRow key={row.inventoryItemId}>
              <TableCell style={{ paddingLeft: '0px' }}>
                {row.itemName}
              </TableCell>
              <TableCell style={{ paddingLeft: '0px' }}>
                {row.categoryName}
              </TableCell>
              <TableCell style={{ paddingLeft: '0px' }} align="right">
                {formatMoney(
                  'sv-SE',
                  0,
                )({
                  amount: row.value,
                  currency: 'SEK',
                })}
              </TableCell>
              <TableCell style={{ paddingLeft: '0px' }}>
                <Mutation
                  mutation={REMOVE_ITEM}
                  refetchQueries={() => {
                    return [
                      {
                        query: GET_INVENTORY,
                        variables: { claimId: this.props.claimId },
                      },
                    ]
                  }}
                >
                  {(removeItem) => {
                    return (
                      <IconButton
                        aria-label="Delete item"
                        onClick={(e) => {
                          removeItem({
                            variables: {
                              inventoryItemId: row.inventoryItemId,
                            },
                          })
                        }}
                      >
                        <DeleteForeverIcon
                          style={{
                            margin: '0px',
                            padding: '4px',
                            color: '#666',
                          }}
                        />
                      </IconButton>
                    )
                  }}
                </Mutation>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

export class ClaimInventory extends React.Component {
  state = {
    itemName: '',
    itemValue: '',
    itemCategory: 'Övrigt',
    fastSubmit: false,
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
      this.state.itemName !== ''
    )
  }

  getNewItem = () => {
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
          return addItemMutation.error ? null : (
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
                    {({ data = {inventory: undefined} }) => {

                      const {inventory: items = []} = data

                      const {
                        itemName: name,
                        itemCategory: category,
                        itemValue: value,
                      } = this.state

                      return (
                        <Paper>
                          <div>
                            <h3>Inventory</h3>
                          </div>

                          {items.length !== 0 && (
                            <InventoryList
                              items={items}
                              claimId={this.props.claimId}
                            />
                          )}

                          <form
                            onSubmit={async (e) => {
                              e.preventDefault()
                              if (this.formLooksGood()) {
                                await addItem({
                                  variables: {
                                    item: this.getNewItem(),
                                  },
                                })

                                this.clearNewItem()
                              }
                            }}
                          >
                            <Grid container spacing={24}>
                              <Grid item xs={5}>
                                <TextField
                                  fullWidth
                                  id="item-name"
                                  color="secondary"
                                  placeholder="New item"
                                  name="itemName"
                                  value={name}
                                  onChange={this.handleChange}
                                  helperText={
                                    this.formLooksGood() &&
                                    this.state.fastSubmit
                                      ? 'Press Return to add item ↩'
                                      : ' '
                                  }
                                />
                              </Grid>
                              <Grid item xs={4}>
                                <Select
                                  fullWidth
                                  id="item-category"
                                  name="itemCategory"
                                  value={category}
                                  onChange={this.handleChange}
                                >
                                  <MenuItem value="Övrigt">Övrigt</MenuItem>

                                  {loadingCategories || errorCategories ? (
                                    <MenuItem value="Övrigt">Övrigt</MenuItem>
                                  ) : (
                                    dataCategories.categories.map((c) => (
                                      <MenuItem key={c.id} value={c.name}>
                                        {c.name}
                                      </MenuItem>
                                    ))
                                  )}
                                </Select>
                              </Grid>
                              <Grid item xs={3}>
                                <TextField
                                  fullWidth
                                  id="item-value"
                                  color="secondary"
                                  name="itemValue"
                                  placeholder="Value"
                                  align="right"
                                  value={value}
                                  onBlur={() =>
                                    this.setState({ fastSubmit: false })
                                  }
                                  onFocus={() =>
                                    this.setState({ fastSubmit: true })
                                  }
                                  onChange={this.handleChange}
                                />
                              </Grid>
                            </Grid>
                            <Grid
                              container
                              alignItems="flex-start"
                              justify="flex-end"
                              direction="row"
                              spacing={24}
                            >
                              <Grid item xs={3}>
                                <Button
                                  fullWidth
                                  variant="contained"
                                  type="submit"
                                  color="primary"
                                  disabled={!this.formLooksGood()}
                                >
                                  Add item
                                </Button>
                              </Grid>
                            </Grid>
                          </form>
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
