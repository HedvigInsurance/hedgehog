import { Member } from 'components/member'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import actions from 'store/actions'

const MemberPage = (props) => <Member {...props} />

const mapStateToProps = ({ claims, auth, payoutDetails }) => ({
  memberClaims: claims.memberClaims,
  auth,
  payoutDetails,
})

export default connect(
  mapStateToProps,
  {
    claimsByMember: actions.claimsActions.claimsByMember,
    ...actions.clientActions,
    ...actions.notificationsActions,
    ...actions.payoutDetailsActions,
  },
  null,
  { pure: false },
)(withRouter(MemberPage))
