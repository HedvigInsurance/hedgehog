import { ChatPanel } from 'components/chat/chat/ChatPanel'
import MessagesList from 'components/chat/messages/MessagesList'
import * as PropTypes from 'prop-types'
import Resizable from 're-resizable'
import * as React from 'react'
import { Icon, Message } from 'semantic-ui-react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import { Mutation, Query } from 'react-apollo'

const resizableStyles = {
  display: 'flex',
  flexDirection: 'column',
  position: 'fixed',
  height: '80%',
  top: '100px',
  right: '10px',
  boxShadow: '0 5px 40px rgba(0, 0, 0, 0.16)',
  borderRadius: '8px',
  backgroundColor: '#ffffff',
}

const ChatHeaderStyle = styled.div`
  position: ${(props) => (!props.state ? 'fixed' : '')};
  right: ${(props) => (!props.state ? 0 : '')};
  height: 40px;
  background-color: #cccccc;
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: space-between;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`
const GET_SUGGESTED_ANSWER_QUERY = gql`
query GetSuggestedAnswer ($question: String) 
{
  getAnswerSuggestion(question: $question) {
    reply
    text
    allReplies
           
  }
}
`;

export default class ChatTab extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      visible: window.innerWidth > 1500,
      manualChange: false,
    }
    window.addEventListener('resize', this.resizeControlChat)
  }
  public componentWillUnmount() {
    window.removeEventListener('resize', this.resizeControlChat, false)
  }

  public resizeControlChat = (e) => {
    if (!this.state.manualChange) {
      this.setState({ visible: window.innerWidth > 1500 })
    }
  }

  //concatenates last messages written by member into one question. The loop could maybe be improved?
  private getQuestionToAnalyze(){

    var lastMemberMessages = '';
    var messageIds = [];

    if (this.props.messages && this.props.messages.list){
            
      let message = this.props.messages.list[this.props.messages.list.length-1];      

      let i=1;
      // this.props.match.params.id is the member id
      while (i<this.props.messages.list.length+1 && message.header.fromId == +this.props.match.params.id && message.id === "free.chat.message"){  
        
        message = this.props.messages.list[this.props.messages.list.length-i];  
        lastMemberMessages = message.body.text.concat(' ').concat(lastMemberMessages);  

        messageIds.push(String(message.header.messageId));   

        i++;
        message = this.props.messages.list[this.props.messages.list.length-i]; 
      }      
      
    }    
    return [lastMemberMessages, messageIds];      
      
    }

  public render() {
    
    const questionAndMessageIds = this.getQuestionToAnalyze(); 

    return this.state.visible ? (
      <>
        <Resizable
          style={resizableStyles}
          defaultSize={{ width: '400px', height: '80%' }}
          enable={{ left: true }}
        >
          <ChatHeader ctx={this} />
          <MessagesList
            messages={(this.props.messages && this.props.messages.list) || []}
            error={!!this.props.socket}
            id={(this.props.match && this.props.match.params.id) || ''}
            messageId={
              (this.props.match && this.props.match.params.msgId) || ''
            }
          />    

          {/* alternatives for updating the query https://www.apollographql.com/docs/react/essentials/queries/#polling-and-refetching*/}
          <Query query={GET_SUGGESTED_ANSWER_QUERY} pollInterval={2000} variables={{question: questionAndMessageIds[0]}}>
          {({ data, loading, error }) => {
            if (loading || error) return <ChatPanel
            allReplies = {null}
            memberId = ''
            messageId = {[]}
            questionToLabel = ''
            addMessage={this.props.addMessage}
            messages={(this.props.messages && this.props.messages.list) || []}
            suggestedAnswer = ''
          />;
    
            return (

            <ChatPanel
            allReplies = {JSON.parse(data.getAnswerSuggestion.allReplies)}
            memberId = {this.props.match.params.id}
            messageId = {questionAndMessageIds[1]}
            questionToLabel = {data.getAnswerSuggestion.text || ''}
            addMessage={this.props.addMessage}
            messages={(this.props.messages && this.props.messages.list) || []}
            suggestedAnswer = {data.getAnswerSuggestion.reply}
          />)
          }}

          </Query>          
          
          {this.props.error && (
            <Message negative>{this.props.error.message}</Message>
          )}
        </Resizable>
      </>
    ) : (
      <>
        <ChatHeader ctx={this} />
      </>
    )
  }

}

const ChatHeader = (props) => (
  <ChatHeaderStyle state={props.ctx.state.visible}>
    <h4>Chat</h4>
    <Icon
      name={props.ctx.state.visible ? 'angle double up' : 'angle double down'}
      size={'large'}
      link
      onClick={() =>
        props.ctx.setState({
          visible: !props.ctx.state.visible,
          manualChange: true,
        })
      }
    />
  </ChatHeaderStyle>
)

ChatTab.propTypes = {
  match: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  addMessage: PropTypes.func.isRequired,
  error: PropTypes.object,
  socket: PropTypes.object,
}
