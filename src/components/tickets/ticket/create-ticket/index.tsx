import React from 'react'
import styled from 'react-emotion'
import { Button, Dropdown, TextArea } from 'semantic-ui-react'
import format from 'date-fns/format'
import { Mutation } from 'react-apollo'
import {
  CREATE_TICKET,
  GET_TICKETS,
} from '../../../../features/taskmanager/queries'
import {
  IEX_TEAM_MEMBERS,
  createOptionsArray,
  TICKET_PRIORITY_HIGH,
  TICKET_PRIORITY_MEDIUM,
  TICKET_PRIORITY_LOW,
} from '../../../../features/taskmanager/types'
import Datepicker from './datepicker.tsx'


const NewTicketBody = styled('div')`
  border: solid 1px gray;
  padding: 1em;
`

//TODO: Fetch these or just match them to hardcoded values in Backoffice
const teamOptions = createOptionsArray(IEX_TEAM_MEMBERS)

const priorityOptions = [
  { text: 'high', value: 1.0 },
  { text: 'medium', value: 0.5 },
  { text: 'low', value: 0.0 },
]


const formatDateTime = (date) => {
  let fDate = format(date, 'yyyy-MM-dd')
  let fTime = format(date, 'HH:mm:ss')
  return [fDate, fTime]
}

class CreateNewTicket extends React.Component {
  state = {
    assignedTo: null,
    createdBy: null,
    priority: null,
    remindNotificationDate: '',
    remindNotificationTime: '',
    description: '',
  }

  componentDidMount() {
    var [date, time] = formatDateTime(new Date())
    this.setState({
      remindNotificationDate: date,
      remindNotificationTime: time,
    })
  }

  render() {
    return (
      <NewTicketBody>
        <h2>Create a new ticket</h2>
        <Mutation mutation={CREATE_TICKET}>
          {(createNewTicket, { data }) => {
            return (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  createNewTicket({
                    variables: {
                      ticket:{
                        assignedTo: this.state.assignedTo,
                        createdBy: this.state.createdBy,
                        priority: this.state.priority,
                        type: 'REMIND',
                        remindNotificationDate: this.state.remindNotificationDate,
                        remindNotificationTime: this.state.remindNotificationTime,
                        description: this.state.description,
                        status: 'WAITING',
                      }
                    },
                    refetchQueries: [{ query: GET_TICKETS, variables: {request: "GiveItToMe"} }],
                  })
                  this.props.closeModal()
                }}
              >
                <label htmlFor={'description'}>Description:</label>
                <br />
                <TextArea
                  row={4}
                  col={20}
                  name="description"
                  placeholder="Type in a description"
                  value={this.state.description}
                  onChange={(e) => this.handleChange(e)}
                />
                <br />
                <label htmlFor={'createdBy'}>Created by:</label>
                <Dropdown
                  name="createdBy"
                  placeholder="Select team member"
                  search
                  selection
                  options={teamOptions}
                  // value={this.state.inputAssignedTo}
                  onChange={(e, { value }) => {
                    this.setState({ createdBy: value })
                  }}
                />
                <label htmlFor={'assign'}>Assign to:</label>
                <Dropdown
                  name="assign"
                  placeholder="Select team member"
                  search
                  selection
                  options={teamOptions}
                  // value={this.state.inputAssignedTo}
                  onChange={(e, { value }) => {
                    this.setState({ assignedTo: value })
                  }}
                />
                <label htmlFor={'priority'}>Priority:</label>
                <Dropdown
                  name="priority"
                  placeholder="Set priority"
                  selection
                  options={priorityOptions}
                  // value={this.state.inputAssignedTo}
                  onChange={(e, { value }) => {
                    this.setState({ priority: value })
                  }}
                />
                <br/>
                <p><strong>Set reminder:</strong></p>
                <Datepicker 
                  handleChange={this.handleChange}
                  datepickerName="remindNotificationDate"
                  datepickerValue={this.state.remindNotificationDate}
                  timepickerName="remindNotificationTime"
                  timepickerValue={this.state.remindNotificationTime}
                />
                <Button type="submit">Create</Button>
              </form>
            )
          }}
        </Mutation>
      </NewTicketBody>
    )
  }

  private handleChange = (e) => {
    e.preventDefault()
    this.setState({ [event.target.name]: event.target.value })
  }
}

export default CreateNewTicket
