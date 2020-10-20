import Grid from '@material-ui/core/Grid'
import { ClaimNote, ClaimTranscription, QueryType } from 'api/generated/graphql'
import { ClaimItems } from 'components/claims/claim-details/components/claim-items'
import { ChatPane } from 'components/member/tabs/ChatPane'
import React from 'react'
import { Query } from 'react-apollo'
import { Mount } from 'react-lifecycle-components/dist'
import { Prompt } from 'react-router'
import { MemberHistoryContext } from 'utils/member-history'
// @ts-ignore
import { ClaimEvents } from './components/ClaimEvents'
import { ClaimFileTable } from './components/ClaimFileTable'
import { ClaimInformation } from './components/ClaimInformation'
import { ClaimNotes } from './components/ClaimNotes'
import { ClaimPayments } from './components/ClaimPayments'
import { ClaimTranscriptions } from './components/ClaimTranscriptions'
import { ClaimTypeForm } from './components/ClaimType'
import { FileUpload } from './components/FileUpload'
import { MemberInformation } from './components/MemberInformation'
import { CLAIM_PAGE_QUERY } from './data'

interface Props {
  match: {
    params: {
      claimId: string
      memberId: string
    }
  }
}

const ClaimPage: React.FC<Props> = ({ ...props }) => (
  <MemberHistoryContext.Consumer>
    {({ pushToMemberHistory }) => (
      <Mount on={() => pushToMemberHistory(props.match.params.memberId)}>
        <>
          <ChatPane memberId={props.match.params.memberId} />
          <Query<Pick<QueryType, 'claim'>>
            query={CLAIM_PAGE_QUERY}
            variables={{ id: props.match.params.claimId }}
            fetchPolicy="no-cache"
          >
            {({ loading, error, data, refetch }) => {
              if (loading) {
                return <div>Loading</div>
              }

              const {
                member,
                recordingUrl,
                registrationDate,
                state,
                notes,
                transcriptions,
                events,
                payments,
                reserves,
                type,
                coveringEmployee,
                claimFiles,
                contract,
              } = data?.claim || {}

              return (
                <Grid container spacing={8}>
                  <Prompt
                    when={Boolean(data?.claim) && !reserves}
                    message="This claim has no reserves, do you want leave it it without?"
                  />
                  {error && (
                    <Grid item xs={12}>
                      <div>
                        Error: <pre>{JSON.stringify(error, null, 2)}</pre>
                      </div>
                    </Grid>
                  )}

                  <Grid item xs={12} sm={12} md={4}>
                    {member && (
                      <MemberInformation
                        member={member}
                        contract={contract ?? null}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <ClaimInformation
                      recordingUrl={recordingUrl!}
                      registrationDate={registrationDate}
                      state={state!}
                      claimId={props.match.params.claimId}
                      coveringEmployee={coveringEmployee!}
                      memberId={props.match.params.memberId}
                      refetchPage={refetch}
                      selectedContract={contract!}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={4}>
                    <ClaimTypeForm
                      type={type}
                      claimId={props.match.params.claimId}
                      refetchPage={refetch}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {notes && (
                      <ClaimNotes
                        notes={(notes.filter(Boolean) as ClaimNote[]) ?? []}
                        claimId={props.match.params.claimId}
                        refetchPage={refetch}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <ClaimItems
                      claimId={props.match.params.claimId}
                      memberId={member?.memberId ?? null}
                      contract={contract}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {transcriptions && transcriptions.length > 0 && (
                      <ClaimTranscriptions
                        transcriptions={transcriptions as ClaimTranscription[]}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {payments && member && (
                      <ClaimPayments
                        payments={payments ?? []}
                        claimId={props.match.params.claimId}
                        reserves={reserves}
                        sanctionStatus={member.sanctionStatus!}
                        refetchPage={refetch}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {member && (
                      <FileUpload
                        claimId={props.match.params.claimId}
                        memberId={member.memberId}
                        onUploaded={() => refetch()}
                      />
                    )}
                    {claimFiles && (
                      <ClaimFileTable
                        claimFiles={claimFiles ?? []}
                        claimId={props.match.params.claimId}
                      />
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    {events && <ClaimEvents events={events ?? []} />}
                  </Grid>
                </Grid>
              )
            }}
          </Query>
        </>
      </Mount>
    )}
  </MemberHistoryContext.Consumer>
)

export default ClaimPage
