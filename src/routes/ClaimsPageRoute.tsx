import ClaimDetailsPage from 'containers/claim-details-page/ClaimDetailsPage'
import { ClaimsPage } from 'containers/claims-page/ClaimsPage'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Route, Switch } from 'react-router'
import PrivateRoute from 'routes/PrivateRoute'

const ClaimsPageRoute = ({ store }) => (
  <Switch>
    <Route
      exact
      path="/claims"
      render={() => (
        <PrivateRoute component={ClaimsPage} path="/claims" store={store} />
      )}
    />
    <Route
      exact
      path="/claims/:claimId/members/:memberId"
      render={() => (
        <PrivateRoute
          component={ClaimDetailsPage}
          path="/claims/:claimId/members/:memberId"
          store={store}
        />
      )}
    />
  </Switch>
)

ClaimsPageRoute.propTypes = {
  store: PropTypes.object.isRequired,
}

export default ClaimsPageRoute
