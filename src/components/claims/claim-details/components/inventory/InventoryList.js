import * as React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core'
import { formatMoney } from 'lib/intl'

export class InventoryList extends React.Component {
  render() {
    return (
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Item</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.items.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="left">{row.itemName}</TableCell>
              <TableCell align="right">{row.categoryName}</TableCell>
              <TableCell align="right">
                {formatMoney(
                  'sv-SE',
                  0,
                )({
                  amount: row.value,
                  currency: 'SEK',
                })}
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}
