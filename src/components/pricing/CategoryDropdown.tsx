import { GET_CATEGORIES } from 'features/pricing/queries'
import * as React from 'react'
import { Query } from 'react-apollo'
import { Dropdown } from 'semantic-ui-react'

export class CategoryDropdown extends React.Component {
  public render() {
    return (
      <Query query={GET_CATEGORIES}>
        {({ loading, error, data }) => {
          return (
            <Dropdown
              placeholder="Category"
              name="activeCategory"
              search
              selection
              onChange={this.props.handle}
              value={this.props.value}
              options={
                loading || error
                  ? [{ key: 1, text: 'None', value: 1 }]
                  : data.categories.map((item) => {
                      return {
                        key: item.id,
                        text: item.name.split(' > ')[
                          item.name.split(' > ').length - 1
                        ],
                        value: item.id,
                      }
                    })
              }
            />
          )
        }}
      </Query>
    )
  }
}
