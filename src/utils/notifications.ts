import React from 'react'
import { connect } from 'react-redux'
import {
  showNotification,
  WithShowNotification,
} from 'store/actions/notificationsActions'

export const withShowNotification = <P extends {}>(
  Component: React.ComponentType<P & WithShowNotification>,
): React.ComponentType<P> =>
  connect<object, WithShowNotification, P, object>(null, {
    showNotification,
  })(Component as any) as any // sorry for the anys, idk what typescript is doing here but the errors are WEIRD
