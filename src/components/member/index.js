import copy from 'copy-to-clipboard'
import { Popover } from 'hedvig-ui/popover'
import { FraudulentStatus } from 'lib/fraudulentStatus'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import styled from 'react-emotion'
import { Header as SemanticHeader, Tab } from 'semantic-ui-react'
import {
  formatSsn,
  getMemberGroup,
  getMemberIdColor,
  MemberAge,
} from 'utils/member'
import memberPagePanes from './tabs'
import ChatPane from './tabs/ChatPane'
import { MemberFlag } from './shared/member-flag'
import { MemberHistoryContext } from '../../utils/member-history'
import { Mount } from 'react-lifecycle-components/dist'

const MemberPageWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
})

const MemberPageContainer = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: calc(100% - 400px);
  min-width: 700px;
  height: 100%;
  white-space: nowrap;
`

const Header = styled(SemanticHeader)`
  display: flex;
  align-items: center;
`

const Badge = styled('div')`
  float: right;
  display: inline-flex;
  padding: 0.5rem 1rem;
  line-height: 1;
  font-size: 1rem;
  ${({ memberId }) => `background: ${getMemberIdColor(memberId)}`};
  border-radius: 8px;
  color: #fff;
  margin-left: auto;
  margin-right: 1rem;
`

const Flag = styled('div')`
  display: inline-flex;
  font-size: 3rem;
`

const MemberDetails = styled('div')`
  color: ${({ theme }) => theme.mutedText};
  padding-bottom: 4rem;
`
const MemberDetail = styled('span')`
  padding-right: 1rem;
`
const MemberDetailLink = MemberDetail.withComponent('a')

export default class Member extends React.Component {
  getMemberPageTitle = (member) =>
    `${member && (member.firstName || '') + ' ' + (member.lastName || '')}`

  componentDidMount() {
    const {
      match: {
        params: { memberId },
      },
      memberRequest,
      insuranceRequest,
      insurancesListRequest,
      claimsByMember,
    } = this.props

    memberRequest(memberId)
    insuranceRequest(memberId)
    claimsByMember(memberId)
    insurancesListRequest(memberId)
  }

  render() {
    const { messages } = this.props
    const panes = memberPagePanes(this.props, this.addMessageHandler)

    return (
      <MemberHistoryContext.Consumer>
        {({ pushToMemberHistory }) => (
          <Mount
            on={() => pushToMemberHistory(this.props.match.params.memberId)}
          >
            <MemberPageWrapper>
              <MemberPageContainer>
                <Header size="huge">
                  <FraudulentStatus stateInfo={this.getFraudulentStatus()} />
                  {this.getMemberPageTitle(messages.member)}
                  {' ('}
                  <MemberAge
                    birthDateString={messages.member?.birthDate}
                  />){' '}
                  {messages.member && (
                    <>
                      <Flag>
                        <MemberFlag memberId={messages.member.memberId} />
                      </Flag>
                      <Badge memberId={messages.member.memberId}>
                        {getMemberGroup(messages.member.memberId)}
                      </Badge>
                    </>
                  )}
                </Header>
                <MemberDetails>
                  {messages?.member?.status === 'SIGNED' &&
                    messages?.member?.ssn && (
                      <MemberDetail>
                        {formatSsn(messages.member.ssn)}
                      </MemberDetail>
                    )}
                  {messages?.member?.email && (
                    <MemberDetailLink href={`mailto:${messages.member.email}`}>
                      {messages.member.email}
                    </MemberDetailLink>
                  )}
                  {messages?.member?.phoneNumber && (
                    <MemberDetailLink
                      href={`tel:${messages.member.phoneNumber}`}
                    >
                      {messages.member.phoneNumber}
                    </MemberDetailLink>
                  )}
                  <Popover contents={<>Click to copy</>}>
                    <MemberDetailLink
                      href={`${window.location.protocol}//${window.location.host}/members/${messages?.member?.memberId}`}
                      onClick={(e) => {
                        e.preventDefault()
                        copy(
                          `${window.location.protocol}//${window.location.host}/members/${messages?.member?.memberId}`,
                          {
                            format: 'text/plain',
                          },
                        )
                      }}
                    >
                      {messages?.member?.memberId}
                    </MemberDetailLink>
                  </Popover>
                </MemberDetails>
                {this.props.insurance.requesting || (
                  <Tab
                    style={{ height: '100%' }}
                    panes={panes}
                    renderActiveOnly={true}
                    defaultActiveIndex={4}
                  />
                )}
              </MemberPageContainer>
              <ChatPane {...this.props} />
            </MemberPageWrapper>
          </Mount>
        )}
      </MemberHistoryContext.Consumer>
    )
  }

  getFraudulentStatus = () => ({
    state:
      this.props.messages && this.props.messages.member
        ? this.props.messages.member.fraudulentStatus
        : '',
    description:
      this.props.messages && this.props.messages.member
        ? this.props.messages.member.fraudulentDescription
        : '',
  })
}

Member.propTypes = {
  messageReceived: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  showNotification: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  setActiveConnection: PropTypes.func.isRequired,
  memberRequest: PropTypes.func.isRequired,
  clearMessagesList: PropTypes.func.isRequired,
  claimsByMember: PropTypes.func.isRequired,
  insuranceRequest: PropTypes.func.isRequired,
  insurancesListRequest: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}
