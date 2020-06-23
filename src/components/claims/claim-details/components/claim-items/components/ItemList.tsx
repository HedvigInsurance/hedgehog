import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Link,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core'
import { useDeleteClaimItemMutation } from 'api/generated/graphql'
import { useGetClaimItems } from 'graphql/use-get-claim-items'
import React from 'react'
import { ChevronRight, Trash } from 'react-bootstrap-icons'
import styled from 'react-emotion'
import { formatMoney } from 'utils/money'
import { ChevronRightWrapper, TrashIconWrapper } from './styles'

const TableCell = withStyles({
  root: {
    padding: 0,
  },
})(MuiTableCell)

const NotSpecifiedLabel = styled(Typography)`
  color: ${({ theme }) => theme.accentBackground};
`

const NotSpecified: React.FC = () => (
  <NotSpecifiedLabel>Not specified</NotSpecifiedLabel>
)

export const ItemList: React.FC<{ claimId: string }> = ({ claimId }) => {
  const [claimItems] = useGetClaimItems(claimId)
  const [deleteClaimItem] = useDeleteClaimItemMutation({
    refetchQueries: ['GetClaimItems'],
  })
  const [itemToDelete, setItemToDelete] = React.useState<string | null>(null)
  const [showNoteDialog, setShowNoteDialog] = React.useState<boolean>(false)
  const [currentNote, setCurrentNote] = React.useState<string>('')

  return (
    <Table style={{ marginBottom: '7px' }}>
      <Dialog open={showNoteDialog} onClose={() => setShowNoteDialog(false)}>
        <DialogTitle>Note</DialogTitle>
        <DialogContent>
          <DialogContentText>{currentNote}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowNoteDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <colgroup>
        <col style={{ width: '50.7%' }} />
        <col style={{ width: '16.6%' }} />
        <col style={{ width: '13.4%' }} />
        <col style={{ width: '16.3%' }} />
        <col style={{ width: '3.0%' }} />
      </colgroup>
      <TableHead style={{ padding: '0px' }}>
        <TableRow>
          <TableCell>Item</TableCell>
          <TableCell>Purchase price</TableCell>
          <TableCell>Purchase date</TableCell>
          <TableCell>Note</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {claimItems.map((item) => {
          const purchasePriceString = item.purchasePrice?.amount
            ? formatMoney(
                {
                  amount: item.purchasePrice?.amount,
                  currency: item.purchasePrice?.currency,
                },
                {
                  minimumFractionDigits: 0,
                  useGrouping: true,
                },
              )
            : null

          const noteString =
            item.note && item.note.length >= 25
              ? item.note?.slice(0, 25) + '...'
              : item.note

          const toBeDeleted = itemToDelete ? itemToDelete === item.id : false

          return (
            <TableRow key={item.id}>
              <TableCell>
                {item.itemFamily.displayName}
                <ChevronRightWrapper>
                  <ChevronRight />
                </ChevronRightWrapper>

                {item.itemType.displayName}
                {item.itemBrand && (
                  <>
                    <ChevronRightWrapper>
                      <ChevronRight />
                    </ChevronRightWrapper>
                    {item.itemBrand.displayName}
                  </>
                )}
                {item.itemModel && (
                  <>
                    <ChevronRightWrapper>
                      <ChevronRight />
                    </ChevronRightWrapper>{' '}
                    {item.itemModel.displayName}
                  </>
                )}
              </TableCell>
              <TableCell>{purchasePriceString ?? <NotSpecified />}</TableCell>
              <TableCell>{item.dateOfPurchase ?? <NotSpecified />}</TableCell>
              <TableCell>
                {noteString ? (
                  <Typography>
                    <Link
                      color="inherit"
                      style={{ textDecoration: 'none', cursor: 'pointer' }}
                      onClick={() => {
                        setCurrentNote(item?.note ?? '')
                        setShowNoteDialog(true)
                      }}
                    >
                      {noteString}
                    </Link>
                  </Typography>
                ) : (
                  <NotSpecified />
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  style={{ marginRight: '-30px' }}
                  disabled={toBeDeleted}
                  onClick={() => {
                    deleteClaimItem({
                      variables: { claimItemId: item.id },
                    }).then(() => setItemToDelete(null))
                  }}
                >
                  <TrashIconWrapper>
                    <Trash />
                  </TrashIconWrapper>
                </IconButton>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}