import Pricing from 'features/pricing'
import { GET_INVENTORY } from 'features/pricing/queries'
import * as React from 'react'
import { Query } from 'react-apollo'
import { Paper } from '../../../../shared/Paper'
import {Button, Icon} from "semantic-ui-react";
import { InventoryList } from "./InventoryList"

export class ClaimItemDatabase extends React.Component {
  state = {}

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
                    <InventoryList
                      items={items}
                      claimId={this.props.claimId}
                    />
                </Paper>

                /*
                <ClaimInventory
                  items={items}
                  type={this.props.type}
                  claimId={this.props.claimId}
                  selectItem={this.selectItem}
                  activeItem={this.state.activeItem}
                  clearActiveItem={this.clearActiveItem}
                />
                 */
              )
            }}
          </Query>
    )
  }
}
