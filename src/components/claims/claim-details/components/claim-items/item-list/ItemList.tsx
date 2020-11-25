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
import { useDescribeClaimItemValuation } from 'graphql/use-describe-claim-item-valuation'
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

const ItemRow: React.FC<{ item: ClaimItem; typeOfContract?: string }> = ({
  item,
  typeOfContract,
}) => {
  const [deleteClaimItem] = useDeleteClaimItemMutation({
    refetchQueries: ['GetClaimItems', 'GetClaimValuation'],
  })

  const [description] = useDescribeClaimItemValuation(
    item.id,
    typeOfContract ?? 'SE_APARTMENT_RENT',
  )

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

  return (
    <>
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
        <TableCell>
          {valuationString ?? <NotSpecified />}{' '}
          <Placeholder>
            {valuationString && typeOfContract ? ` (${description})` : ''}
          </Placeholder>
        </TableCell>
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
                onClick={() => {
                  deleteClaimItem({
                    variables: { claimItemId: item.id },
                  })
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
    </>
  )
}

export const ItemList: React.FC<{
  claimItems: ClaimItem[]
  typeOfContract?: string
}> = ({ claimItems, typeOfContract }) => {
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
        {claimItems.map((item) => (
          <ItemRow key={item.id} item={item} typeOfContract={typeOfContract} />
        ))}
      </TableBody>
    </Table>
  )
}
