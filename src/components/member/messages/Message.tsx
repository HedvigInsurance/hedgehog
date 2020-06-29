import ImageMessage from 'components/member/messages/ImageMessage'
import SelectMessage from 'components/member/messages/SelectMessage'
import { format } from 'date-fns'
import { css } from 'emotion'
import * as types from 'lib/messageTypes'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'react-emotion'

const MessageRow = styled('div')<
  WithLeft & { isQuestion?: boolean; isVisible: boolean }
>`
  display: flex;
  justify-content: ${(props) => (props.left ? 'flex-end' : 'flex-start')};
  margin: ${(props) => (props.isQuestion ? '0px' : '0.5rem 0')};
  width: 100%;
  box-sizing: border-box;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transform: ${(props) => (props.isVisible ? 'scale(1)' : 'scale(0.6)')};
  transform-origin: ${(props) => (props.left ? 'right' : 'left')} bottom;
  transition: all 0.25s ease-out;
`

const MessageBox = styled('div')`
  max-width: 400px;
`

interface WithLeft {
  left: boolean
}

const MessageBody = styled('div')<WithLeft>`
  white-space: pre-wrap;
  word-wrap: break-word;
  z-index: 2000;
  position: relative;
  &,
  & label {
    color: ${({ left, theme }) =>
      left ? theme.accentContrast : theme.foreground} !important;
  }

  line-height: 1.4em;
  background: ${(props) =>
    props.left ? props.theme.accent : props.theme.accentLight};
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;

  &:before {
    position: absolute;
    content: '';
    width: 0.7em;
    height: 0.7em;
    background: ${(props) =>
      props.left ? props.theme.accent : props.theme.accentLight};

    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    z-index: 2;
    box-shadow: 1px 1px 0 0 ${({ theme }) => theme.border};
    bottom: -0.3em;
    ${({ left }) => css`
      ${left ? `right: 1em;` : `left: 1em;`};
    `};
    top: auto;
    margin-left: 0;
  }
`

const MessageInfo = styled('div')<WithLeft>`
  margin: 0.5em 0;
  font-size: 0.9rem;
  ${({ left }) => left && `text-align: right;`};
`
const Timestamp = styled('div')`
  color: ${({ theme }) => theme.mutedText};
  font-size: 0.8rem;
`

const Video = styled('video')`
  max-width: 350px;
`

const Image = styled('img')`
  max-width: 350px;
`

const isImage = (text) => {
  return text.match(/\.(jpeg|jpg|gif|png)$/) != null
}

const Message = React.forwardRef<
  React.ReactNode,
  {
    left: boolean
    content: any
    isQuestionMessage?: boolean
    timestamp: Date
    from?: string
  }
>(({ left, content, isQuestionMessage, timestamp, from }, ref) => {
  const [isVisible, setVisible] = React.useState(false)

  React.useEffect(() => {
    setVisible(true)
  })

  return (
    <MessageRow
      left={left}
      isQuestion={isQuestionMessage}
      innerRef={ref}
      isVisible={isVisible}
    >
      <MessageBox>
        <MessageBody left={left}>
          {isImage(content.text) && <Image src={content.text} />}
          {!isImage(content.text) && <>{content.text}</>}
          <br />
          <MessageContent content={content} />
        </MessageBody>
        <MessageInfo left={left}>
          {from}
          {timestamp ? (
            <Timestamp>{format(timestamp, "MMM dd ''yy, HH:mm")}</Timestamp>
          ) : null}
        </MessageInfo>
      </MessageBox>
    </MessageRow>
  )
})

const MessageContent = ({ content }) => {
  switch (content.type) {
    case types.DATE:
      return <p>Date: {content.date}</p>
    case types.AUDIO:
      return <audio src={content.URL} controls />
    case types.VIDEO:
      return <Video src={content.URL} controls />
    case types.PHOTO:
    case types.PARAGRAPH:
    case types.HERO:
      return <ImageMessage content={content} />
    case types.MULTIPLE_SELECT:
    case types.SINGLE_SELECT:
      return <SelectMessage content={content} />
    case types.FILE_UPLOAD:
      return <a href={content.url}>Attached file</a>
    default:
      return null
  }
}

MessageContent.propTypes = {
  content: PropTypes.object.isRequired,
}

export default Message
