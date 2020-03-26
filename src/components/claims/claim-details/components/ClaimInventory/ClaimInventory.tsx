import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  InputLabel,
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
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined'
import {
  GetInventoryDocument,
  useAddIventoryItemMutation,
  useGetCategoriesQuery,
  useGetDetailsQuery,
  useGetInventoryQuery,
  useGetSuggestionsQuery,
  useRemoveIventoryItemMutation,
} from 'api/generated/graphql'
import format from 'date-fns/format'
import { DatePicker } from 'material-ui-pickers'
import React, { useState } from 'react'
import { formatMoney } from '../../../../../lib/intl'
import { Paper } from '../../../../shared/Paper'

const InventoryTable = withStyles({
  root: {
    marginBottom: '5px',
    display: 'block',
    height: '150px',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
})(Table)

const InventoryTableCell = withStyles({
  root: {
    paddingLeft: '0px',
  },
})(TableCell)

const InventoryTableHeadCell = withStyles({
  root: {
    fontWeight: 600,
  },
})(InventoryTableCell)

const DeleteIcon = withStyles({
  root: {
    margin: '0px',
    padding: '0px',
    color: '#666',
    fontSize: 'medium',
  },
})(DeleteForeverIcon)

const InventoryList = ({ items, claimId }) => {
  const [itemBeingDeleted, setItemBeingDeleted] = useState(null)
  const [removeInventoryItem] = useRemoveIventoryItemMutation()

  return (
    <>
      <Table>
        <colgroup>
          <col style={{ width: '34%' }} />
          <col style={{ width: '16.5%' }} />
          <col style={{ width: '26.5%' }} />
          <col style={{ width: '22%' }} />
          <col style={{ width: '2%' }} />
        </colgroup>

        <TableHead>
          <TableRow>
            <InventoryTableHeadCell>Item</InventoryTableHeadCell>
            <InventoryTableHeadCell>Purchase value</InventoryTableHeadCell>
            <InventoryTableHeadCell>Category</InventoryTableHeadCell>
            <InventoryTableHeadCell>Purchase date</InventoryTableHeadCell>
            <InventoryTableHeadCell />
          </TableRow>
        </TableHead>
      </Table>
      <InventoryTable>
        <colgroup>
          <col style={{ width: '35%' }} />
          <col style={{ width: '17.5%' }} />
          <col style={{ width: '26.5%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '0%' }} />
        </colgroup>

        <TableBody>
          {items.map(
            ({
              inventoryItemId,
              purchaseValue,
              itemName,
              categoryName,
              purchaseDate,
            }) => (
              <TableRow key={inventoryItemId}>
                <InventoryTableCell>{itemName}</InventoryTableCell>
                <InventoryTableCell>
                  {formatMoney('sv-SE')({
                    amount: purchaseValue,
                    currency: 'SEK',
                  })}
                </InventoryTableCell>
                <InventoryTableCell>{categoryName}</InventoryTableCell>
                <InventoryTableCell>
                  {purchaseDate ? purchaseDate : 'Not specified'}
                </InventoryTableCell>
                <InventoryTableCell padding="checkbox">
                  <IconButton
                    disabled={itemBeingDeleted === inventoryItemId}
                    onClick={() => {
                      setItemBeingDeleted(inventoryItemId)
                      removeInventoryItem({
                        variables: {
                          inventoryItemId,
                        },
                        refetchQueries: [
                          {
                            query: GetInventoryDocument,
                            variables: { claimId },
                          },
                        ],
                      })
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </InventoryTableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </InventoryTable>
    </>
  )
}

export const ClaimInventory = ({ claimId }) => {
  const [itemName, setItemName] = useState('')
  const [itemPurchaseValue, setItemPurchaseValue] = useState('')
  const [itemCategory, setItemCategory] = useState('Miscellaneous')
  const [itemPurchaseDate, setItemPurchaseDate] = useState(null)

  const [showCategoryPicker, setShowCategoryPicker] = useState(false)
  const [itemPrimaryCategory, setItemPrimaryCategory] = useState('')
  const [itemSecondaryCategory, setItemSecondaryCategory] = useState('')

  const [addInventoryItem] = useAddIventoryItemMutation()

  const clearNewItem = () => {
    setItemName('')
    setItemPurchaseValue('')
    setItemCategory('Miscellaneous')
    setItemPurchaseDate(null)
    setItemPrimaryCategory('')
    setItemSecondaryCategory('')
  }

  const useSuggestion = () => {
    const { name, price, category } = suggestion

    if (itemName !== '' && name && price && category) {
      setItemName(name)
      setItemPurchaseValue(price)
      setItemCategory(category)
    }
  }

  const getAggregatedResult = () => {
    if (suggestionResult.length !== 0) {
      const aggregatedResult = suggestionResult.itemSuggestions[0]

      if (typeof aggregatedResult !== 'undefined') {
        if (!aggregatedResult.url) {
          return aggregatedResult
        }
      }
    }

    return { name: null, pricerunnerId: [], url: null }
  }

  const { data: categories } = useGetCategoriesQuery()

  const { data = { inventory: undefined } } = useGetInventoryQuery({
    variables: { claimId },
  })

  const { data: suggestionResult = [] } = useGetSuggestionsQuery({
    variables: { query: itemName },
  })

  const {
    data: smartSuggestion = { itemDetails: { category: null, price: null } },
  } = useGetDetailsQuery({
    variables: { ids: getAggregatedResult().pricerunnerId },
  })

  const { inventory: items = [] } = data

  const suggestion = {
    name: getAggregatedResult().name,
    category: smartSuggestion.itemDetails.category,
    price: smartSuggestion.itemDetails.price,
  }

  const formLooksGood =
    /^[0-9]+$/.test(itemPurchaseValue) &&
    itemPurchaseValue !== '' &&
    itemName !== ''

  const currentItem = {
    categoryName: itemCategory,
    purchaseValue: parseFloat(itemPurchaseValue),
    itemName,
    claimId,
    purchaseDate: itemPurchaseDate,
  }

  return (
    <Paper>
      {console.log(categories)}
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <div>
            <h3>Inventory</h3>
          </div>

          <InventoryList
            items={items.length !== 0 ? items : []}
            claimId={claimId}
          />

          <form
            onSubmit={async (e) => {
              e.preventDefault()

              if (formLooksGood) {
                await addInventoryItem({
                  variables: {
                    item: currentItem,
                  },
                  refetchQueries: () => [
                    {
                      query: GetInventoryDocument,
                      variables: { claimId },
                    },
                  ],
                })
                clearNewItem()
              }
            }}
          >
            <Grid container spacing={24}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  color="secondary"
                  placeholder="New item"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.keyCode === 18) {
                      useSuggestion()
                    }
                  }}
                  helperText={
                    formLooksGood
                      ? 'Press Return to add item ↩'
                      : itemName !== '' &&
                        suggestion.name &&
                        suggestion.category &&
                        itemName !== suggestion.name
                      ? 'Press Alt to use suggestion ⌥'
                      : ' '
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  fullWidth
                  color="secondary"
                  placeholder="Purchase value"
                  value={itemPurchaseValue}
                  onChange={(e) => setItemPurchaseValue(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  color="secondary"
                  placeholder="Category"
                  onClick={() => setShowCategoryPicker(true)}
                  value={itemCategory}
                />
                <Dialog
                  fullWidth
                  open={showCategoryPicker}
                  onClose={() => setShowCategoryPicker(false)}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle>Select category</DialogTitle>
                  <DialogContent>
                    <InputLabel>Primary</InputLabel>
                    <Select
                      value={itemPrimaryCategory}
                      onChange={(e) => {
                        setItemPrimaryCategory(e.target.value)
                        setItemSecondaryCategory('')
                      }}
                      style={{ marginBottom: '25px' }}
                    >
                      {categories?.categories.map(({ primary }) => {
                        return (
                          <MenuItem key={primary} value={primary}>
                            {primary}
                          </MenuItem>
                        )
                      })}
                    </Select>
                    <InputLabel>Secondary</InputLabel>
                    <Select
                      disabled={false}
                      value={itemSecondaryCategory}
                      onChange={(e) => setItemSecondaryCategory(e.target.value)}
                    >
                      {categories?.categories.map(
                        ({ primary, secondaries }) => {
                          return (
                            primary === itemPrimaryCategory &&
                            secondaries.map((secondary) => {
                              return (
                                <MenuItem key={secondary} value={secondary}>
                                  {secondary}
                                </MenuItem>
                              )
                            })
                          )
                        },
                      )}
                    </Select>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setShowCategoryPicker(false)}
                      color="primary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setItemCategory(
                          itemPrimaryCategory +
                            (itemSecondaryCategory !== ''
                              ? ', ' + itemSecondaryCategory
                              : ''),
                        )
                        setShowCategoryPicker(false)
                      }}
                      color="primary"
                    >
                      Confirm
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
              <Grid item xs={3}>
                <DatePicker
                  autoOk
                  clearable
                  labelFunc={(date: Date) =>
                    date ? format(date, 'yyyy-MM-dd') : ''
                  }
                  fullWidth
                  value={itemPurchaseDate}
                  onChange={(date: Date) => {
                    date
                      ? setItemPurchaseDate(format(date, 'yyyy-MM-dd'))
                      : setItemPurchaseDate(null)
                  }}
                  placeholder="Purchase date"
                />
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="flex-start"
              justify="flex-end"
              direction="row"
              spacing={24}
              style={{ marginTop: '10px' }}
            >
              {suggestion.name && itemName !== '' && (
                <Grid item xs={9}>
                  <Chip
                    style={{ fontWeight: 500, color: '#555' }}
                    icon={
                      <WbIncandescentOutlinedIcon
                        style={{ fontSize: 'medium' }}
                      />
                    }
                    label="Suggestion"
                  />
                  <Chip
                    style={{ fontWeight: 600, marginLeft: '8px' }}
                    color="primary"
                    variant="outlined"
                    label={suggestion.name}
                  />
                  {suggestion.category && (
                    <Chip
                      style={{ fontWeight: 600, marginLeft: '4px' }}
                      color="primary"
                      variant="outlined"
                      label={suggestion.category}
                    />
                  )}

                  {suggestion.price && (
                    <Chip
                      style={{ fontWeight: 600, marginLeft: '4px' }}
                      color="primary"
                      variant="outlined"
                      label={suggestion.price + ' kr'}
                    />
                  )}
                </Grid>
              )}
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
        </Grid>
      </Grid>
    </Paper>
  )
}
