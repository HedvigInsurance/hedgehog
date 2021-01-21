import Notifications from 'components/notifications'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { TransitionablePortal } from 'semantic-ui-react'
import actions from 'store/actions'

const NotificationsContainer = styled.div`
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 400px;
  margin: auto;
  z-index: 10000;
`

const NotificationService = (props) => (
  <TransitionablePortal open={!!props.notifications.length}>
    <NotificationsContainer>
      <Notifications {...props} />
    </NotificationsContainer>
  </TransitionablePortal>
)

NotificationService.propTypes = {
  notifications: PropTypes.array.isRequired,
}

const mapStateToProps = ({ notifications }) => ({
  notifications,
})

export default connect(mapStateToProps, {
  ...actions.notificationsActions,
})(NotificationService)
