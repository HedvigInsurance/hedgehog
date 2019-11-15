import Grid from '@material-ui/core/Grid'
import gql from 'graphql-tag'
import * as React from 'react'
import { Query, Mutation } from 'react-apollo'

import { ClaimEvents } from './components/ClaimEvents'
import { ClaimInformation } from './components/ClaimInformation'
import { ClaimNotes } from './components/ClaimNotes'
import { ClaimPayments } from './components/ClaimPayments'
import { ClaimType, TYPE_FRAGMENT } from './components/ClaimType'
import { MemberInformation } from './components/MemberInformation'
import { FileUpload } from './components/FileUpload'
import { Table, Image } from 'semantic-ui-react'
import styled from 'react-emotion'
import { colors } from '@hedviginsurance/brand'
import actions from 'store/actions'
import { connect } from 'react-redux'

const CLAIM_FILES_QUERY = gql`
  query ClaimFilesQuery($id: ID!) {
    claim(id: $id) {
      claimFiles {
        claimFileId
        fileUploadUrl
        markedAsDeleted
      }
    }
  }
`

const MARK_CLAIM_FILE_AS_DELETED = gql`
  mutation markClaimFileAsDeleted($claimId: ID!, $claimFileId: ID!) {
    markClaimFileAsDeleted(claimId: $claimId, claimFileId: $claimFileId)
  }
`

const CLAIM_PAGE_QUERY = gql`
  query ClaimPage($id: ID!) {
    claim(id: $id) {
      member {
        memberId
        signedOn
        firstName
        lastName
        personalNumber
        address
        postalNumber
        city
        directDebitStatus {
          activated
        }
        fraudulentStatus
        sanctionStatus
        numberFailedCharges {
          numberFailedCharges
          lastFailedChargeAt
        }
        account {
          totalBalance
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
        date
      }
      reserves
      payments {
        id
        amount
        deductible
        note
        timestamp
        exGratia
        type
        #transaction {
        #  status
        #}
        status
      }
      events {
        text
        date
      }
      coveringEmployee
      __typename
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

interface ClaimFiles {
  claimFileId: string
  fileUploadUrl: string
  markedAsDeleted: boolean
}

interface MemberFileTableProps {
  claimFiles: Array<ClaimFiles>
  claimId: string
  showNotification: (data: any) => void
}

const Button = styled('div')({
  backgroundColor: colors.LIGHT_GRAY,
  padding: '2rem',
})

// const queryClaims = (id) => {
//   <Query query={CLAIM_FILES_QUERY} variables={{ id: id}}>
//   {({ loading, error, data }) => {
//     if (error) {
//       return (
//         <div>
//           Error in GraphQl query here.....:{' '}
//           <pre>{JSON.stringify(error, null, 2)}</pre>
//         </div>
//       )
//     }
//     if (loading || !data) {
//       return <div>Loading...</div>
//     }
//     return data.claim.claimFiles === 0 ? (
//       <div>No claim documents have been uploaded for this claim</div>
//     ) : (
//       <ClaimFileTable claimFiles={data.claim.claimFiles} claimId={id} />
//     )
//   }}
// </Query>
// }

const handleClick = (mutation, claimId, claimFileId, showNotification) => {
  console.log(`do we get here ${mutation} ${claimId} ${claimFileId}`)
  mutation({
    variables: {
      claimId: claimId,
      claimFileId: claimFileId
    },
  })
  // }).then(() => {
  //   queryClaims(claimId)
  // })
    .then(() => {
      showNotification({
        message: 'claim file has been deleted',
        header: 'Approved',
        type: 'olive',
      })
    })
    .catch((error) => {
      showNotification({
        message: error.message,
        header: 'Error',
        type: 'red',
      })
      throw error
    })
}

export const ClaimFileTableComponent: React.FunctionComponent<MemberFileTableProps> = ({
  claimFiles,
  claimId,
  showNotification
}) => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Claim Files</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {[...claimFiles].map((claimFile) => {
        if (claimFile.markedAsDeleted === false) {
          return (
            <Table.Row key={claimFile.fileUploadUrl}>
              <Table.Cell>
                <Image src={claimFile.fileUploadUrl} size="medium" />
              </Table.Cell>
              <Table.Cell>


              <Mutation
                mutation={MARK_CLAIM_FILE_AS_DELETED}
                // refetchQueries={() => [
                //   {
                //     CLAIM_FILES_QUERY,
                //     variables: {
                //       claimId: claimId,
                //     },
                //   },
                // ]}
              >
                {(mutation, { loading }) => {
                  return (
                    <Button
                      disabled={loading}
                      onClick={() => handleClick(mutation, claimId, claimFile.claimFileId, showNotification)}
                    >Delete</Button>
                  )
                }}
              </Mutation>
              </Table.Cell>
            </Table.Row>
          )
        }
      })}
    </Table.Body>
  </Table>
)

const mapActions = { ...actions.notificationsActions }

export const ClaimFileTable = connect(
  null,
  mapActions,
)(ClaimFileTableComponent)

const ClaimPage: React.SFC<Props> = ({ match }) => (
  <>
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
          reserves,
          type,
          coveringEmployee,
        } = data.claim

        return (
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12} md={4}>
              <MemberInformation member={member} />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <ClaimInformation
                recordingUrl={recordingUrl}
                registrationDate={registrationDate}
                state={state}
                claimId={match.params.id}
                coveringEmployee={coveringEmployee}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <ClaimType type={type} claimId={match.params.id} />
            </Grid>
            <Grid item xs={12}>
              <ClaimNotes notes={notes} claimId={match.params.id} />
            </Grid>
            <Grid item xs={12}>
              <ClaimPayments
                payments={payments}
                claimId={match.params.id}
                reserves={reserves}
                sanctionStatus={member.sanctionStatus}
              />
            </Grid>
            <Grid item xs={12}>
              <ClaimEvents events={events} />
            </Grid>
            <Grid item xs={12}>
              <FileUpload
                claimId={match.params.id}
                memberId={data.claim.member.memberId}
              />
            </Grid>
          </Grid>
        )
      }}
    </Query>

    <Query query={CLAIM_FILES_QUERY} variables={{ id: match.params.id }}>
      {({ loading, error, data }) => {
        if (error) {
          return (
            <div>
              Error in GraphQl query here.....:{' '}
              <pre>{JSON.stringify(error, null, 2)}</pre>
            </div>
          )
        }
        if (loading || !data) {
          return <div>Loading...</div>
        }
        return data.claim.claimFiles === 0 ? (
          <div>No claim documents have been uploaded for this claim</div>
        ) : (
          <ClaimFileTable claimFiles={data.claim.claimFiles} claimId={match.params.id} />
        )
      }}
    </Query>
  </>
)

export default ClaimPage
