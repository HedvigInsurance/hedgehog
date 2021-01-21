import { Dashboard } from 'components/dashboard'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

const DashboardPage = (props) => <Dashboard {...props} />

export default withRouter(
  connect(
    ({ auth}) => ({
      auth,
    })
  )(DashboardPage),
)
