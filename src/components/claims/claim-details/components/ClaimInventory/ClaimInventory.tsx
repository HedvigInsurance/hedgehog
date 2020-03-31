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
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  withStyles,
} from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import CloseIcon from '@material-ui/icons/Close'
import DeleteForeverIcon from '@material-ui/icons/Delete'
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
import { Dropdown } from 'semantic-ui-react'
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

const itemTree = {}

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
  const [itemPurchaseDate, setItemPurchaseDate] = useState('')
  const [addInventoryItem] = useAddIventoryItemMutation()

  const { data: { inventory } = { inventory: [] } } = useGetInventoryQuery({
    variables: { claimId },
  })

  return (
    <Paper>
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <div>
            <h3>Inventory</h3>
          </div>

          <InventoryList items={inventory} claimId={claimId} />

          <form>
            <Grid container spacing={24}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  color="secondary"
                  placeholder="New item"
                  value={itemName}
                  InputProps={{
                    startAdornment: (
                      <>
                        <Chip
                          style={{ fontWeight: 600 }}
                          color="primary"
                          label={'Phone'}
                          deleteIcon={
                            <ArrowRightIcon style={{ fontSize: 'medium' }} />
                          }
                        />
                        <Chip
                          style={{ fontWeight: 600, marginLeft: '4px' }}
                          color="primary"
                          variant="outlined"
                          label={'Apple iPhone'}
                          deleteIcon={
                            <ArrowRightIcon style={{ fontSize: 'medium' }} />
                          }
                        />
                        <Chip
                          style={{ fontWeight: 600, marginLeft: '4px' }}
                          color="primary"
                          variant="outlined"
                          label={'8'}
                          deleteIcon={
                            <ArrowRightIcon style={{ fontSize: 'medium' }} />
                          }
                        />
                        <Chip
                          style={{
                            fontWeight: 600,
                            marginLeft: '4px',
                            marginRight: '4px',
                          }}
                          color="primary"
                          variant="outlined"
                          label={'64GB'}
                          deleteIcon={
                            <CloseIcon style={{ fontSize: 'medium' }} />
                          }
                        />
                      </>
                    ),
                  }}
                  onChange={(e) => setItemName(e.target.value)}
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
                <DatePicker
                  autoOk
                  clearable
                  labelFunc={(date: Date) =>
                    date ? format(date, 'yyyy-MM-dd') : ''
                  }
                  fullWidth
                  value={itemPurchaseDate === '' ? null : itemPurchaseDate}
                  onChange={(date: Date) => {
                    date
                      ? setItemPurchaseDate(format(date, 'yyyy-MM-dd'))
                      : setItemPurchaseDate('')
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
              <Grid item xs={3}>
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  color="primary"
                  disabled={true}
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
