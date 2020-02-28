import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core'
import { formatMoney } from 'lib/intl'
import { REMOVE_ITEM } from 'features/pricing/mutations'
import { GET_INVENTORY } from 'features/pricing/queries'
import { Mutation } from 'react-apollo'
import DeleteForeverIcon from '@material-ui/icons/Delete'

export class InventoryList extends React.Component {
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
