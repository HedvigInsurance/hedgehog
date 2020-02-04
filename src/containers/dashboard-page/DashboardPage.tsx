import { Dashboard } from 'components/dashboard'
import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import actions from 'store/actions'

const DashboardPage = (props) => <Dashboard {...props} />

export default withRouter(
  connect(
    ({ auth, messages, dashboard }) => ({
      auth,
      messages,
      dashboard,
    }),
    {
      ...actions.dashboardActions,
      ...actions.clientActions,
      setActiveConnection: actions.messagesActions.setActiveConnection,
    },
  )(DashboardPage),
)
