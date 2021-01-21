import MemberPage from 'containers/MemberPage'
import { MembersSearchPage } from 'containers/MembersSearchPage'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Route, Switch } from 'react-router'
import PrivateRoute from 'routes/PrivateRoute'

const MessagesPageRouter = ({ store }) => (
  <Switch>
    <Route
      exact
      path="/members"
      render={() => (
        <PrivateRoute
          component={MembersSearchPage}
          path="/members"
          store={store}
        />
      )}
    />
    <Route
      path="/members/:memberId/:msgId?"
      render={() => (
        <PrivateRoute
          component={MemberPage}
          path="/members/:memberId/:msgId?"
          store={store}
        />
      )}
    />
  </Switch>
)

MessagesPageRouter.propTypes = {
  store: PropTypes.object.isRequired,
}

export default MessagesPageRouter
