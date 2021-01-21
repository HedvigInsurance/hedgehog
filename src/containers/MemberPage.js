import { Member } from 'components/member'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import actions from 'store/actions'

const MemberPage = (props) => <Member {...props} />

const mapStateToProps = ({ auth, payoutDetails }) => ({
  auth,
  payoutDetails,
})

export default connect(
  mapStateToProps,
  {
    ...actions.clientActions,
    ...actions.notificationsActions,
    ...actions.payoutDetailsActions,
  },
  null,
  { pure: false },
)(withRouter(MemberPage))
