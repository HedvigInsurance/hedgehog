import { ChatPanel } from 'components/member/chat/ChatPanel'
import { MessagesList } from 'components/member/messages/MessagesList'
import PropTypes from 'prop-types'
import Resizable from 're-resizable'
import React from 'react'
import styled from 'react-emotion'
import { Icon, Message } from 'semantic-ui-react'

const resizableStyles = {
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  height: '80%',
  top: '100px',
  right: '10px',
  boxShadow: '0 5px 40px rgba(0, 0, 0, 0.16)',
  borderRadius: '8px',
  zIndex: '999',
}

const ChatHeaderStyle = styled('div')`
  position: ${(props) => (!props.state ? 'fixed' : '')};
  right: ${(props) => (!props.state ? 0 : '')};
  height: 40px;
  background-color: ${({ theme }) => theme.accentBackground};
  color: ${({ theme }) => theme.foreground};
  border: 1px solid ${({ theme }) => theme.borderStrong};
  border-bottom: 0;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: space-between;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`

export default class ChatPane extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: window.innerWidth > 1500,
      manualChange: false,
    }
    window.addEventListener('resize', this.resizeControlChat)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeControlChat, false)
  }

  resizeControlChat = (e) => {
    if (!this.state.manualChange) {
      this.setState({ visible: window.innerWidth > 1500 })
    }
  }

  onResizeClick = () => {
    this.setState({
      visible: !this.state.visible,
      manualChange: true,
    })
  }

  render() {
    return this.state.visible ? (
      <>
        <Resizable
          style={resizableStyles}
          defaultSize={{ width: '400px', height: '80%' }}
          enable={{ left: true }}
        >
          <ChatHeader
            visible={this.state.visible}
            onResizeClick={this.onResizeClick}
          />
          <MessagesList
            memberId={
              (this.props.match && this.props.match.params.memberId) || ''
            }
          />
          <ChatPanel memberId={this.props.match.params.memberId} />
          {this.props.error && (
            <Message negative>{this.props.error.message}</Message>
          )}
        </Resizable>
      </>
    ) : (
      <>
        <ChatHeader
          visible={this.state.visible}
          onResizeClick={this.onResizeClick}
        />
      </>
    )
  }
}

const ChatHeader = (props) => (
  <ChatHeaderStyle state={props.visible}>
    <h4>Chat</h4>
    <Icon
      name={props.visible ? 'angle double up' : 'angle double down'}
      size={'large'}
      link
      onClick={props.onResizeClick}
    />
  </ChatHeaderStyle>
)

ChatPane.propTypes = {
  match: PropTypes.object.isRequired,
}
