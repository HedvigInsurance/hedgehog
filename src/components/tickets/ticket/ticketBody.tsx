import format from 'date-fns/format'
import React from 'react'
import styled from 'react-emotion'
import {
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Segment,
} from 'semantic-ui-react'
import {
  createOptionsArray,
  IEX_TEAM_MEMBERS_OPTIONS,
  lookupStatus,
  TICKET_STATUS,
  TicketStatus,
  TicketType,
} from '../../../features/taskmanager/types'
import { IRemindNotification } from '../types'
import AssignTicketToMutation from './edit-ticket-mut/assignTo'
import ChangeDescriptionMutation from './edit-ticket-mut/description'
import ChangePriorityMutation from './edit-ticket-mut/priority'
import ChangeReminderMutation from './edit-ticket-mut/reminder'
import ChangeStatusMutation from './edit-ticket-mut/status'
import { Redirector } from './util/redirect'

const teamOptions = createOptionsArray(IEX_TEAM_MEMBERS_OPTIONS)
const statusOptions = createOptionsArray(TICKET_STATUS)

const TicketBodyCss = styled('div')`
  padding: 1em;
  margin: 1em;
  border: 1px lightgray solid;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(227, 231, 235, 0.33) 100%
  );
`

interface ITicketBody {
  id: string
  assignedTo: string
  priority: number
  status: TicketStatus
  description: string
  reminder: IRemindNotification
  type: TicketType
  memberId: string
  referenceId: string
}

interface ITicketBodyState {
  inputs: {
    description: string
    assignedTo: string
    remindDate: any
    remindTime: any
    remindMessage: string
    priority: number
    status: TicketStatus
    touched: {
      description: boolean
      remindDate: boolean
      remindTime: boolean
      remindMessage: boolean
    }
  }
  showEditTicket: boolean
  redirect: boolean
}

export class TicketBody extends React.Component<ITicketBody, ITicketBodyState> {
  public state = {
    inputs: {
      description: this.props.description,
      assignedTo: this.props.assignedTo,
      status: this.props.status,
      remindDate: format(new Date(), 'yyyy-MM-dd'),
      remindTime: format(new Date(), 'HH:mm:ss'),
      remindMessage: '',
      priority: this.props.priority,
      touched: {
        description: false,
        assignedTo: false,
        status: false,
        remindDate: false,
        remindTime: false,
        remindMessage: false,
      },
    },
    showEditTicket: false,
    redirect: false,
  }

  public render() {
    const editTicket = (
      <Grid celled>
        <Button
          labelPosition="left"
          icon
          onClick={(event) => this.toggleEditTicket(event)}
          basic
          toggle
        >
          {this.state.showEditTicket ? (
            <Icon name="close" />
          ) : (
            <Icon name="pencil alternate" />
          )}
          {this.state.showEditTicket ? 'Close Edit' : 'Open Edit'}
        </Button>
        <Grid.Row>
          <Grid.Column>
            <ChangeDescriptionMutation
              id={this.props.id}
              description={this.state.inputs.description}
              touched={this.state.inputs.touched.description}
              handleChange={this.handleChange}
              oldDescription={this.props.description}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid columns={2} stackable>
            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <AssignTicketToMutation
                  id={this.props.id}
                  handleChange={this.handleOptionChange}
                  options={teamOptions}
                  assignedTo={this.state.inputs.assignedTo}
                  currentlyAssignedTo={this.props.assignedTo}
                />
              </Grid.Column>
              <Grid.Column>
                <ChangeStatusMutation
                  id={this.props.id}
                  status={this.state.inputs.status}
                  handleChange={this.handleOptionChange}
                  options={statusOptions}
                  currentStatus={this.props.status}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Grid.Row>
        <Divider horizontal> </Divider>

        <Grid.Row>
          <Grid.Column>
            <ChangePriorityMutation
              id={this.props.id}
              priority={this.state.inputs.priority}
              oldPriority={this.props.priority}
              handleChange={this.handleChange}
            />
          </Grid.Column>
        </Grid.Row>
        <Divider horizontal> </Divider>

        <Grid.Row>
          <Grid.Column>
            <strong>Set reminder</strong>

            <ChangeReminderMutation
              id={this.props.id}
              remindDate={this.state.inputs.remindDate}
              remindTime={this.state.inputs.remindTime}
              remindMessage={this.state.inputs.remindMessage}
              handleChange={this.handleChange}
              currentReminder={this.props.reminder}
              touchedDate={this.state.inputs.touched.remindDate}
              touchedTime={this.state.inputs.touched.remindTime}
              touchedMessage={this.state.inputs.touched.remindMessage}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )

    const ticketInfo = (
      <>
        <Segment.Group>
          <Segment color="grey" compact>
            <strong>Description</strong>
          </Segment>
          <Segment compact textAlign="left">
            <Container text>{this.props.description}</Container>
          </Segment>

          {this.props.referenceId && this.props.referenceId.length > 0
            ? this.createReferenceRoute(
                this.props.referenceId,
                this.props.memberId,
                this.props.type,
              )
            : null}
        </Segment.Group>

        <Segment.Group horizontal>
          <Segment compact>
            <strong>Status:</strong> {lookupStatus(this.props.status)}{' '}
          </Segment>
          {this.fillInMemberId(this.props.memberId)}
          {this.fillInReferenceId(this.props.type, this.props.referenceId)}
        </Segment.Group>
      </>
    )

    return (
      <TicketBodyCss>
        {this.state.showEditTicket ? editTicket : ticketInfo}
        <Button
          labelPosition="left"
          icon
          onClick={(event) => this.toggleEditTicket(event)}
          basic
          toggle
        >
          {this.state.showEditTicket ? (
            <Icon name="close" />
          ) : (
            <Icon name="pencil alternate" />
          )}
          {this.state.showEditTicket ? 'Close Edit' : 'Open Edit'}
        </Button>
      </TicketBodyCss>
    )
  }

  private toggleEditTicket = (event) => {
    event.preventDefault()
    const updatedState = !this.state.showEditTicket
    this.setState({ showEditTicket: updatedState })
  }

  private handleOptionChange = (id: string, value: string): void => {
    const inputs = { ...this.state.inputs }
    inputs[id] = value
    this.setState({ inputs })
  }

  private handleChange = (event) => {
    const inputs = { ...this.state.inputs }
    inputs[event.target.name] = event.target.value
    inputs.touched[event.target.name] = true
    this.setState({ inputs })
  }

  private fillInReferenceId = (type: TicketType, referenceId: string) => {
    let label: string
    switch (type) {
      case TicketType.CLAIM:
        label = 'ClaimId: '
        // code...
        break

      case TicketType.MESSAGE:
        label = 'MessageId: '

        break
      default:
        return null
    }
    return (
      <Segment compact>
        <strong>{label}</strong>
        {referenceId}{' '}
      </Segment>
    )
  }

  private fillInMemberId = (memberId: string) => {
    if (memberId === null) {
      return null
    }
    return (
      <Segment compact>
        <strong>MemberId: </strong>
        {memberId}{' '}
      </Segment>
    )
  }

  private createReferenceRoute = (
    referenceId: string,
    memberId: string,
    type: TicketType,
  ) => {
    switch (type) {
      case TicketType.CLAIM: {
        if (!memberId) {
          return null
        }
        const route = 'claims/' + referenceId + '/members/' + memberId
        return <Redirector route={route} redirectText="Go to claim" />
      }
      case TicketType.MESSAGE: {
        const route = 'members/' + memberId
        return <Redirector route={route} redirectText="Go to chat" />
      }
      default:
        return null
    }
  }
}
