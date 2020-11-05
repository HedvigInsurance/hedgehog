import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow,
  withStyles,
} from '@material-ui/core'
import { ClaimItem, useDeleteClaimItemMutation } from 'api/generated/graphql'
import { Placeholder } from 'hedvig-ui/typography'
import React from 'react'
import { ChevronRight, InfoCircleFill, Trash } from 'react-bootstrap-icons'
import { formatMoney } from 'utils/money'
import {
  ChevronRightWrapper,
  InfoWrapper,
  NotePopover,
  TrashIconWrapper,
} from '../styles'

const TableCell = withStyles({
  root: {
    padding: 0,
  },
})(MuiTableCell)

const NotSpecified: React.FC = () => <Placeholder>Not specified</Placeholder>

export const ItemList: React.FC<{ claimItems: ClaimItem[] }> = ({
  claimItems,
}) => {
  const [deleteClaimItem] = useDeleteClaimItemMutation({
    refetchQueries: ['GetClaimItems'],
  })
  const [itemToDelete, setItemToDelete] = React.useState<string | null>(null)

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ width: '28%' }}>Item</TableCell>
          <TableCell style={{ width: '24%' }}>Valuation</TableCell>
          <TableCell style={{ width: '10%' }}>Purchase price</TableCell>
          <TableCell style={{ width: '15%' }}>Purchase date</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {claimItems.map((item) => {
          const purchasePriceString = item.purchasePrice?.amount
            ? formatMoney(
                {
                  amount: item.purchasePrice.amount,
                  currency: item.purchasePrice.currency,
                },
                {
                  minimumFractionDigits: 0,
                  useGrouping: true,
                },
              )
            : null

          const valuationString = item.valuation?.amount
            ? formatMoney(
                {
                  amount: item.valuation.amount,
                  currency: item.valuation.currency,
                },
                {
                  minimumFractionDigits: 0,
                  useGrouping: true,
                },
              )
            : null

          const toBeDeleted = itemToDelete === item.id

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
              <TableCell>{valuationString ?? <NotSpecified />}</TableCell>
              <TableCell>{purchasePriceString ?? <NotSpecified />}</TableCell>
              <TableCell>{item.dateOfPurchase ?? <NotSpecified />}</TableCell>
              <TableCell>
                <Grid container spacing={8}>
                  <Grid item xs={6}>
                    {item?.note && (
                      <NotePopover contents={<>{item?.note}</>}>
                        <InfoWrapper>
                          <InfoCircleFill />
                        </InfoWrapper>
                      </NotePopover>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <IconButton
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
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
