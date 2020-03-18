import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  withStyles,
} from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/Delete'
import gql from 'graphql-tag'
import { formatMoney } from 'lib/intl'
import React, { useState } from 'react'
import { Paper } from '../../../shared/Paper'

const GET_CATEGORIES = gql`
  query Categories {
    categories
  }
`

const GET_INVENTORY = gql`
  query Inventory($claimId: ID!) {
    inventory(claimId: $claimId) {
      inventoryItemId
      claimId
      itemName
      categoryName
      value
    }
  }
`

const GET_SUGGESTIONS = gql`
  query Suggestions($query: String!) {
    itemSuggestions(query: $query) {
      name
      url
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

const InventoryList = ({ items }) => {
  const [removeItem] = useMutation(REMOVE_ITEM)
  const [itemBeingDeleted, setItemBeingDeleted] = useState(null)

  return (
    <InventoryTable>
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
        {items.map(({ inventoryItemId, value, itemName, categoryName }) => (
          <TableRow key={inventoryItemId}>
            <InventoryTableCell>{itemName}</InventoryTableCell>
            <InventoryTableCell>{categoryName}</InventoryTableCell>
            <InventoryTableCell align="right">
              {formatMoney('sv-SE')({
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
                      inventoryItemId,
                    },
                    refetchQueries: ['Inventory'],
                  })
                }}
              >
                <DeleteIcon />
              </IconButton>
            </InventoryTableCell>
          </TableRow>
        ))}
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

  const { data: suggestions } = useQuery(GET_SUGGESTIONS, {
    variables: { query: itemName },
  })

  const { inventory: items = [] } = data

  const formLooksGood =
    /^[0-9]+$/.test(itemValue) && itemValue !== '' && itemName !== ''

  const clearNewItem = () => {
    setItemName('')
    setItemValue('')
    setItemCategory('Övrigt')
  }

  const currentItem = {
    inventoryItemId: null,
    categoryName: itemCategory,
    value: itemValue,
    itemName,
    claimId,
  }

  return (
    <Paper>
      <div>
        <h3>Inventory</h3>
      </div>

      {items.length !== 0 && <InventoryList items={items} />}

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          if (formLooksGood) {
            await addItem({
              variables: {
                item: currentItem,
              },
              refetchQueries: [
                {
                  query: GET_INVENTORY,
                  variables: { claimId },
                },
              ],
            })
          }
          clearNewItem()
        }}
      >
        <Grid container spacing={24}>
          <Grid item xs={5}>
            <TextField
              fullWidth
              color="secondary"
              placeholder="New item"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              helperText={
                formLooksGood && fastSubmit ? 'Press Return to add item ↩' : ' '
              }
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              fullWidth
              value={itemCategory}
              onChange={(e) => setItemCategory(e.target.value)}
            >
              {loadingCategories || errorCategories
                ? null
                : dataCategories.categories.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}

              <MenuItem value="Övrigt">Övrigt</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              color="secondary"
              placeholder="Value"
              value={itemValue}
              onBlur={() => setFastSubmit(false)}
              onFocus={() => setFastSubmit(true)}
              onChange={(e) => setItemValue(e.target.value)}
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
        <Grid>
          {typeof suggestions !== 'undefined' ? (
            <>
              {suggestions.itemSuggestions.map(({ name }) => {
                return <p>{name}</p>
              })}
            </>
          ) : (
            <></>
          )}
        </Grid>
      </form>
    </Paper>
  )
}
