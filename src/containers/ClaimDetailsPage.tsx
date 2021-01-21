import ClaimDetails from 'components/claims/claim-details'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import actions from 'store/actions'

const ClaimDetailsPage = (props) => <ClaimDetails {...props} />

const mapStateToProps = ({ auth }) => ({
  auth,
})

export default withRouter(
  // @ts-ignore
  connect(mapStateToProps, {
    ...actions.notificationsActions,
  })(ClaimDetailsPage),
)
