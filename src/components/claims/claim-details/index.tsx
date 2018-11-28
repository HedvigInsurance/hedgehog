import Grid from '@material-ui/core/Grid'
import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation, Query } from 'react-apollo'

import { ClaimInformation } from './components/ClaimInformation'
import { ClaimPayments } from './components/ClaimPayments'
import { ClaimType, ClaimTypes } from './components/ClaimType'
import { Events } from './components/Events'
import { MemberInformation } from './components/MemberInformation'
import { Notes } from './components/Notes'

const TYPE_FRAGMENT = `
        __typename
        ... on TheftClaim {
          location
          date
          item
          policeReport
          receipt
        }
        ... on AccidentalDamageClaim {
          location
          date
          item
          policeReport
          receipt
        }
        ... on AssaultClaim {
          location
          date
          policeReport
        }
        ... on WaterDamageClaim {
          date
        }
        ... on TravelAccidentClaim {
          location
          date
          policeReport
          receipt
        }
        ... on LuggageDelayClaim {
          location
          date
          ticket
        }
`

const CLAIM_PAGE_QUERY = gql`
  query ClaimPage($id: ID!) {
    claim(id: $id) {
      member {
        firstName
        lastName
        personalNumber
        address
        postalNumber
        city
        directDebitStatus {
          activated
        }
      }
      registrationDate
      recordingUrl
      state
      type {
        ${TYPE_FRAGMENT}
      }
      notes {
        text
      }
      reserves
      payments {
        amount
        note
        timestamp
        exGratia
        type
        transaction {
          status
        }
      }
      events {
        text
        date
      }
      __typename
    }
  }
`

const UPDATE_STATE_QUERY = gql`
  query UpdateClaimState($id: ID!) {
    claim(id: $id) {
      state
      events {
        text
        date
      }
    }
  }
`

const UPDATE_CLAIM_STATE_MUTATION = gql`
  mutation UpdateClaimState($id: ID!, $state: ClaimState!) {
    updateClaimState(id: $id, state: $state) {
      state
      events {
        text
        date
      }
    }
  }
`

const SET_CLAIM_TYPE_QUERY = gql`
  query SetClaimType($id: ID!) {
    claim(id: $id) {
      type {
        ${TYPE_FRAGMENT}
      }
      events {
        text
        date
      }
    }
  }
`

const SET_CLAIM_TYPE_MUTATION = gql`
  mutation SetClaimType($id: ID!, $type: ClaimTypes!) {
    setClaimType(id: $id, type: $type) {
      type {
        ${TYPE_FRAGMENT}
      }
      events {
        text
        date
      }
    }
  }
`

const SET_CLAIM_INFORMATION = gql`
  mutation SetClaimInformation($id: ID!, $claimInformation: ClaimInformationInput!) {
    setClaimInformation(id: $id, information: $claimInformation) {
      type {
        ${TYPE_FRAGMENT}
      }
      events {
        text
        date
      }
    }
  }
`

const SET_CLAIM_INFORMATION_QUERY = gql`
  query SetClaimInformation($id: ID!) {
    claim(id: $id) {
      type {
        ${TYPE_FRAGMENT}
      }
      events {
        text
        date
      }
    }
  }
`

const ADD_CLAIM_NOTE_QUERY = gql`
  query AddClaimQuery($id: ID!) {
    claim(id: $id) {
      notes {
        text
      }
      events {
        text
        date
      }
    }
  }
`

const ADD_CLAIM_NOTE_MUTATION = gql`
  mutation AddClaimNote($id: ID!, $note: ClaimNoteInput!) {
    addClaimNote(id: $id, note: $note) {
      notes {
        text
      }
      events {
        text
        date
      }
    }
  }
`

const CREATE_PAYMENT_QUERY = gql`
  query CreatePaymentQuery($id: ID!) {
    claim(id: $id) {
      payments {
        amount
        note
        type
        timestamp
        exGratia
        transaction {
          status
        }
      }
      events {
        text
        date
      }
    }
  }
`

const CREATE_PAYMENT_MUTATION = gql`
  mutation CreatePayment($id: ID!, $payment: ClaimPaymentInput!) {
    createClaimPayment(id: $id, payment: $payment) {
      payments {
        amount
        note
        type
        timestamp
        exGratia
        transaction {
          status
        }
      }
      events {
        text
        date
      }
    }
  }
`

interface Props {
  match: {
    params: {
      id: string
    }
  }
}

const ClaimPage: React.SFC<Props> = ({ match }) => (
  <Query query={CLAIM_PAGE_QUERY} variables={{ id: match.params.id }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <div>Loading</div>
      }

      if (error) {
        return (
          <div>
            Error: <pre>{JSON.stringify(error, null, 2)}</pre>
          </div>
        )
      }

      const {
        member,
        recordingUrl,
        registrationDate,
        state,
        notes,
        events,
        payments,
        type,
      } = data.claim

      return (
        <Grid container spacing={16}>
          <Grid item>
            <div>
              Claim id: {match.params.id}
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
          </Grid>
          <Grid item>
            <MemberInformation member={member} />
          </Grid>
          <Grid item>
            <Mutation
              mutation={UPDATE_CLAIM_STATE_MUTATION}
              update={(cache, { data: updateData }) => {
                cache.writeQuery({
                  query: UPDATE_STATE_QUERY,
                  variables: { id: match.params.id },
                  data: {
                    claim: {
                      state: updateData.updateClaimState.state,
                      events: updateData.updateClaimState.events,
                      __typename: data.claim.__typename,
                    },
                  },
                })
              }}
            >
              {(updateClaimState) => (
                <ClaimInformation
                  recordingUrl={recordingUrl}
                  registrationDate={registrationDate}
                  state={state}
                  updateState={(newState) =>
                    updateClaimState({
                      variables: { id: match.params.id, state: newState },
                    })
                  }
                />
              )}
            </Mutation>
          </Grid>
          <Mutation
            mutation={SET_CLAIM_TYPE_MUTATION}
            update={(cache, { data: updateData }) => {
              cache.writeQuery({
                query: SET_CLAIM_TYPE_QUERY,
                variables: { id: match.params.id },
                data: {
                  claim: {
                    type: updateData.setClaimType.type,
                    events: updateData.setClaimType.events,
                    __typename: data.claim.__typename,
                  },
                },
              })
            }}
          >
            {(setClaimType) => (
              <Mutation
                mutation={SET_CLAIM_INFORMATION}
                update={(cache, { data: updateData }) => {
                  cache.writeQuery({
                    query: SET_CLAIM_INFORMATION_QUERY,
                    variables: { id: match.params.id },
                    data: {
                      claim: {
                        type: updateData.setClaimInformation.type,
                        events: updateData.setClaimInformation.events,
                        __typename: data.claim.__typename,
                      },
                    },
                  })
                }}
              >
                {(setClaimInformation) => (
                  <Grid item>
                    <ClaimType
                      type={type}
                      setClaimInformation={(i: any) => {
                        setClaimInformation({
                          variables: {
                            id: match.params.id,
                            claimInformation: i,
                          },
                        })
                      }}
                      setClaimType={(t: ClaimTypes) => {
                        setClaimType({
                          variables: {
                            id: match.params.id,
                            type: t,
                          },
                        })
                      }}
                    />
                  </Grid>
                )}
              </Mutation>
            )}
          </Mutation>
          <Grid item>
            <Mutation
              mutation={CREATE_PAYMENT_MUTATION}
              update={(cache, { data: updateData }) => {
                cache.writeQuery({
                  query: CREATE_PAYMENT_QUERY,
                  variables: { id: match.params.id },
                  data: {
                    claim: {
                      payments: updateData.createClaimPayment.payments,
                      __typename: data.claim.__typename,
                      events: updateData.createClaimPayment.events,
                    },
                  },
                })
              }}
            >
              {(createPayment) => (
                <ClaimPayments
                  payments={payments}
                  createPayment={(values) =>
                    createPayment({
                      variables: {
                        id: match.params.id,
                        payment: { ...values },
                      },
                    })
                  }
                />
              )}
            </Mutation>
          </Grid>
          <Grid item>
            <Mutation
              mutation={ADD_CLAIM_NOTE_MUTATION}
              update={(cache, { data: updateData }) => {
                cache.writeQuery({
                  query: ADD_CLAIM_NOTE_QUERY,
                  variables: { id: match.params.id },
                  data: {
                    claim: {
                      notes: updateData.addClaimNote.notes,
                      __typename: data.claim.__typename,
                      events: updateData.addClaimNote.events,
                    },
                  },
                })
              }}
            >
              {(addClaimNote) => (
                <Notes
                  notes={notes}
                  addClaimNote={(note) =>
                    addClaimNote({
                      variables: { id: match.params.id, note: { text: note } },
                    })
                  }
                />
              )}
            </Mutation>
          </Grid>
          <Grid item>
            <Events events={events} />
          </Grid>
        </Grid>
      )
    }}
  </Query>
)

export default ClaimPage

// export default class ClaimDetails extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   componentDidMount() {
//     const { match, memberRequest, claimRequest, claimTypes } = this.props;
//     const id = match.params.id;
//     const userId = match.params.userId;
//     claimRequest(id);
//     memberRequest(userId);
//     claimTypes();
//   }

//   render() {
//     const {
//       claimDetails: { data },
//       createNote,
//       updateReserve,
//       createPayment,
//       match
//     } = this.props;
//     return (
//       <ClaimDetailsContainer>
//         <Header size="huge">Claim Details</Header>

//         {data ? (
//           <React.Fragment>
//             <ClaimInfo {...this.props} />
//             <Notes
//               notes={data.notes}
//               createNote={createNote}
//               id={match.params.id}
//             />
//             <Payments
//               claimDetails={data}
//               updateReserve={updateReserve}
//               createPayment={createPayment}
//               id={match.params.id}
//             />
//             <EventsLog events={data.events} />
//           </React.Fragment>
//         ) : null}
//       </ClaimDetailsContainer>
//     );
//   }
// }

// ClaimDetails.propTypes = {
//   claimDetails: PropTypes.object.isRequired,
//   createNote: PropTypes.func.isRequired,
//   updateReserve: PropTypes.func.isRequired,
//   match: PropTypes.object.isRequired,
//   claimRequest: PropTypes.func.isRequired,
//   claimTypes: PropTypes.func.isRequired,
//   createPayment: PropTypes.func.isRequired,
//   memberRequest: PropTypes.func.isRequired
// };
