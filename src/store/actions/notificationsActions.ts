import React from 'react'
import { SemanticCOLORS } from 'semantic-ui-react'
import {
  NOTIFICATION_CLEAR,
  NOTIFICATION_DISMISS,
  NOTIFICATION_SHOW,
} from '../constants/notifications'

export interface Notification {
  type?: SemanticCOLORS
  header: React.ReactNode
  message: React.ReactNode
}

export interface WithShowNotification {
  showNotification: (data: Notification) => void
}

export const showNotification = (data: Notification) => ({
  type: NOTIFICATION_SHOW,
  data: {
    ...data,
    id: Math.floor(Math.random() * 10000),
  },
})

export const dismissNotification = (id) => ({ type: NOTIFICATION_DISMISS, id })

export const clearAllNotifications = () => ({ type: NOTIFICATION_CLEAR })
