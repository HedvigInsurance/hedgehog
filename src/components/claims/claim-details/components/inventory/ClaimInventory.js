import Pricing from 'features/pricing'
import { GET_INVENTORY } from 'features/pricing/queries'
import * as React from 'react'
import { Query } from 'react-apollo'
import { Paper } from '../../../../shared/Paper'
import { InventoryList } from './InventoryList'
import { TextField } from '@material-ui/core'

export class ClaimInventory extends React.Component {
  state = {
    itemName: '',
    itemValue: '',
    itemCategory: '',
  }

  handleChange = (event) => {
    const { target: { name, value } } = event
    this.setState(() => ({ [name]: value }))
  }

  render() {
    return (
      <Query
        query={GET_INVENTORY}
        variables={{
          claimId: this.props.claimId,
        }}
      >
        {({ data, loading, error }) => {
          let items = []

          if (!loading) {
            if (!error) {
              if (typeof data !== 'undefined') {
                if ('inventory' in data) {
                  items = data.inventory
                }
              }
            }
          }

          return (
            <Paper>
              <div>
                <h3>Inventory</h3>
              </div>
              <InventoryList items={items} claimId={this.props.claimId} />
              <div style={{ display: 'inline-flex' }}>
                <TextField
                  id="item-name"
                  style={{ width: '48%' }}
                  color="secondary"
                  name="itemName"
                  placeholder="Item"
                  value={this.state.itemName}
                  onChange={this.handleChange}
                  helperText={"Press Enter to add item"}
                />
                <TextField
                  id="item-value"
                  style={{ width: '18%', marginLeft: '2%'}}
                  color="secondary"
                  placeholder="Value"
                  name="itemValue"
                  value={this.state.itemValue}
                  onChange={this.handleChange}
                />
                <TextField
                  id="item-category"
                  style={{ width: '25%', marginLeft: '2%'}}
                  color="secondary"
                  placeholder="Category"
                  name="itemCategory"
                  value={this.state.itemCategory}
                  onChange={this.handleChange}
                />
              </div>
            </Paper>
          )
        }}
      </Query>
    )
  }
}
