import {
  TextField,
  Button,
  Grid,
  Select,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  withStyles,
} from '@material-ui/core'
import MenuItem from '@material-ui/core/MenuItem'
import DeleteForeverIcon from '@material-ui/icons/Delete'
import { formatMoney } from 'lib/intl'
import { GET_INVENTORY, GET_CATEGORIES } from 'features/pricing/queries'
import { ADD_ITEM, REMOVE_ITEM } from 'features/pricing/mutations'
import * as React from 'react'
import { Query, Mutation } from 'react-apollo'
import { Paper } from '../../../shared/Paper'

const InventoryTable = withStyles({
  root: {
    marginBottom: '25px',
  },
})(Table)

const InventoryTableCell = withStyles({
  root: {
    paddingLeft: '0px'
  },
})(TableCell)

const DeleteIcon = withStyles({
    root: {
      margin: '0px',
      padding: '4px',
      color: '#666',
    },
})(DeleteForeverIcon)


class InventoryList extends React.Component {
  render() {
    return (
      <InventoryTable size="small">
        <colgroup>
          <col style={{ width: '45%' }} />
          <col style={{ width: '24%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '2%' }} />
        </colgroup>

        <TableHead>
          <TableRow>
            <InventoryTableCell>Item</InventoryTableCell>
            <InventoryTableCell>Category</InventoryTableCell>
            <InventoryTableCell align="right">
              Value
            </InventoryTableCell>
            <InventoryTableCell/>
          </TableRow>
        </TableHead>

        <TableBody>
          {this.props.items.map((row) => (
            <TableRow key={row.inventoryItemId}>
              <InventoryTableCell>
                {row.itemName}
              </InventoryTableCell>
              <InventoryTableCell>
                {row.categoryName}
              </InventoryTableCell>
              <InventoryTableCell align="right">
                {formatMoney(
                  'sv-SE',
                  0,
                )({
                  amount: row.value,
                  currency: 'SEK',
                })}
              </InventoryTableCell>
              <InventoryTableCell>
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
                        onClick={() => {
                          removeItem({
                            variables: {
                              inventoryItemId: row.inventoryItemId,
                            },
                          })
                        }}
                      >
                        <DeleteIcon/>
                      </IconButton>
                    )
                  }}
                </Mutation>
              </InventoryTableCell>
            </TableRow>
          ))}
        </TableBody>
      </InventoryTable>
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
                    {({ data = { inventory: undefined } }) => {
                      const { inventory: items = [] } = data

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
