import { ChatPanel } from 'components/member/chat/ChatPanel'
import { MessagesList } from 'components/member/messages/MessagesList'
import PropTypes from 'prop-types'
import Resizable from 're-resizable'
import React, { useEffect, useState } from 'react'
import styled from 'react-emotion'
import { Icon } from 'semantic-ui-react'

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

const ChatHeaderStyle = styled.div`
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

export const ChatPane = ({ memberId }) => {
  const [visible, setVisible] = useState(window.innerWidth > 1000)
  const [manualChange, setManualChange] = useState(false)

  useEffect(() => {
    const resizeControlChat = (e) => {
      if (!manualChange) {
        setVisible(window.innerWidth > 1000)
      }
    }
    window.addEventListener('resize', resizeControlChat)
    return () => window.removeEventListener('resize', resizeControlChat)
  }, [])

  const onResizeClick = () => {
    setVisible(!visible)
    setManualChange(true)
  }
  return visible ? (
    <Resizable
      style={resizableStyles}
      defaultSize={{ width: '400px', height: '80%' }}
      maxWidth={'90vw'}
      maxHeight={'85vh'}
      enable={{ left: true }}
    >
      <ChatHeader visible={visible} onResizeClick={onResizeClick} />
      <MessagesList memberId={memberId} />
      <ChatPanel memberId={memberId} />
    </Resizable>
  ) : (
    <ChatHeader visible={visible} onResizeClick={onResizeClick} />
  )
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
  memberId: PropTypes.string.isRequired,
}
