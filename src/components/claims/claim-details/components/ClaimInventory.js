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
  MenuItem,
  withStyles,
} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/Delete'
import { formatMoney } from 'lib/intl'
import React, { useState } from 'react'
import { Query } from 'react-apollo'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Paper } from '../../../shared/Paper'
import gql from 'graphql-tag'

const GET_CATEGORIES = gql`
  {
    categories {
      id
      name
    }
  }
`

const SEARCH_ITEMS = gql`
  query Items($payload: Payload!) {
    items(payload: $payload) {
      products {
        id
        name
      }
    }
  }
`

const GET_INVENTORY = gql`
  query Inventory($claimId: ID!) {
    inventory(claimId: $claimId) {
      inventoryItemId
      claimId
      itemName
      categoryName
      categoryId
      value
      source
      upperRange
      lowerRange
      itemId
    }
  }
`

const ADD_ITEM = gql`
  mutation AddIventoryItem($item: InventoryItemInput!) {
    addInventoryItem(item: $item)
  }
`

const REMOVE_ITEM = gql`
  mutation RemoveIventoryItem($inventoryItemId: ID!) {
    removeInventoryItem(inventoryItemId: $inventoryItemId)
  }
`

const InventoryTable = withStyles({
  root: {
    marginBottom: '25px',
  },
})(Table)

const InventoryTableCell = withStyles({
  root: {
    paddingLeft: '0px',
  },
})(TableCell)

const DeleteIcon = withStyles({
  root: {
    margin: '0px',
    padding: '4px',
    color: '#666',
  },
})(DeleteForeverIcon)

const InventoryList = ({ claimId, items }) => {
  const [removeItem] = useMutation(REMOVE_ITEM)
  const [itemBeingDeleted, setItemBeingDeleted] = useState(null)

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
          <InventoryTableCell align="right">Value</InventoryTableCell>
          <InventoryTableCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {items.map(
          ({
            inventoryItemId,
            value,
            itemName: name,
            categoryName: category,
          }) => (
            <TableRow key={inventoryItemId}>
              <InventoryTableCell>{name}</InventoryTableCell>
              <InventoryTableCell>{category}</InventoryTableCell>
              <InventoryTableCell align="right">
                {formatMoney(
                  'sv-SE',
                  0,
                )({
                  amount: value,
                  currency: 'SEK',
                })}
              </InventoryTableCell>
              <InventoryTableCell>
                <IconButton
                  disabled={itemBeingDeleted === inventoryItemId}
                  onClick={() => {
                    setItemBeingDeleted(inventoryItemId)
                    removeItem({
                      variables: {
                        inventoryItemId: inventoryItemId,
                      },
                      refetchQueries: ['Inventory'],
                    })
                  }}
                >
                  <DeleteIcon style={{color: itemBeingDeleted === inventoryItemId ? '#bbb' : null}} />
                </IconButton>
              </InventoryTableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </InventoryTable>
  )
}

export const ClaimInventory = ({ claimId }) => {
  const [itemName, setItemName] = useState('')
  const [itemValue, setItemValue] = useState('')
  const [itemCategory, setItemCategory] = useState('Övrigt')
  const [fastSubmit, setFastSubmit] = useState(false)

  const [addItem] = useMutation(ADD_ITEM)
  const {
    data: dataCategories,
    loading: loadingCategories,
    error: errorCategories,
  } = useQuery(GET_CATEGORIES)

  const { data = { inventory: undefined } } = useQuery(GET_INVENTORY, {
    variables: { claimId },
  })

  const { inventory: items = [] } = data
  const { itemName: name, itemCategory: category, itemValue: value } = {
    itemName,
    itemCategory,
    itemValue,
  }

  const formLooksGood =
    /^[0-9]+$/.test(itemValue) && itemValue !== '' && itemName !== ''

  const clearNewItem = () => {
    setItemName('')
    setItemValue('')
    setItemCategory('Övrigt')
  }

  const currentItem = {
    inventoryItemId: null,
    itemName: itemName,
    categoryName: itemCategory,
    categoryId: '-1',
    value: itemValue,
    source: 'Custom',
    upperRange: null,
    lowerRange: null,
    itemId: null,
    filters: [],
    claimId,
  }

  return (
    <Paper>
      <div>
        <h3>Inventory</h3>
      </div>

      {items.length !== 0 && <InventoryList items={items} claimId />}

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          formLooksGood &&
            (await addItem({
              variables: {
                item: currentItem,
              },
              refetchQueries: [
                {
                  query: GET_INVENTORY,
                  variables: { claimId },
                },
              ],
            }))
          clearNewItem()
        }}
      >
        <Grid container spacing={24}>
          <Grid item xs={5}>
            <TextField
              fullWidth
              color="secondary"
              placeholder="New item"
              value={name}
              onChange={({ target: { value } }) => setItemName(value)}
              helperText={
                formLooksGood && fastSubmit ? 'Press Return to add item ↩' : ' '
              }
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              fullWidth
              value={category}
              onChange={({ target: { value } }) => setItemCategory(value)}
            >
              <MenuItem value="Övrigt">Övrigt</MenuItem>

              {loadingCategories || errorCategories ? (
                <MenuItem value="Övrigt">Övrigt</MenuItem>
              ) : (
                dataCategories.categories.map(({ name, id }) => (
                  <MenuItem key={id} value={name}>
                    {name}
                  </MenuItem>
                ))
              )}
            </Select>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              color="secondary"
              placeholder="Value"
              align="right"
              value={value}
              onBlur={() => setFastSubmit(false)}
              onFocus={() => setFastSubmit(true)}
              onChange={({ target: { value } }) => setItemValue(value)}
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
              disabled={!formLooksGood}
            >
              Add item
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}
