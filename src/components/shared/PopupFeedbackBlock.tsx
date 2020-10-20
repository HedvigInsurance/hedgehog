import { IconButton, Snackbar } from '@material-ui/core'
import { Cross } from 'components/icons'
import React from 'react'

interface PopupFeedbackBlockProps {
  message: string
  onTimeout: () => void
  duration: number
}

export default class PopupFeedbackBlock extends React.Component<
  PopupFeedbackBlockProps
> {
  public componentDidMount() {
    const { onTimeout, duration } = this.props
    setTimeout(() => onTimeout(), duration)
  }

  public render() {
    const { message, onTimeout } = this.props

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={!!message}
        autoHideDuration={6000}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onTimeout}
          >
            <Cross />
          </IconButton>,
        ]}
      />
    )
  }
}
