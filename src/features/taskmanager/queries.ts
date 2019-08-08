import gql from 'graphql-tag'

// Hacky solution to know who the user is: , returns the email.
export const ME = gql`
  query Me {
    me
  }
`
export const CREATE_TICKET = gql`
  mutation CreateTicket($ticket: TicketInput) {
    createTicket(ticket: $ticket)
  }
`

export const GET_TICKETS = gql`
  query GetTickets ($onlyResolvedTickets: Boolean ){
    tickets (resolved: $onlyResolvedTickets){
      id
      description
      assignedTo
      createdBy
      type
      status
      priority
      remindNotificationDate
      remindNotificationTime
      remindMessage
      referenceId
      memberId
    }
  }
`

export const CHANGE_DESCRIPTION = gql`
  mutation ChangeDescription($ticketId: ID!, $newDescription: String) {
    changeTicketDescription(
      ticketId: $ticketId
      newDescription: $newDescription
    )
  }
`
export const ASSIGN_TO = gql`
  mutation AssignTicketTo($ticketId: ID!, $teamMemberId: ID!) {
    assignTicketToTeamMember(ticketId: $ticketId, teamMemberId: $teamMemberId)
  }
`
export const CHANGE_STATUS = gql`
  mutation ChangeTicketStatus($ticketId: ID!, $newStatus: TicketStatus) {
    changeTicketStatus(ticketId: $ticketId, newStatus: $newStatus)
  }
`

export const CHANGE_PRIORITY = gql`
  mutation ChangeTicketPriority($ticketId: ID!, $newPriority: Float) {
    changeTicketPriority(ticketId: $ticketId, newPriority: $newPriority)
  }
`

export const CHANGE_REMINDER = gql`
  mutation ChangeTicketReminder(
    $ticketId: ID!
    $newReminder: RemindNotification
  ) {
    changeTicketReminder(ticketId: $ticketId, newReminder: $newReminder)
  }
`

export const QUESTION_IS_DONE = gql`
  mutation QuestionIsDone($memberId: ID!) {
    questionIsDone(memberId: $memberId)
  }
`