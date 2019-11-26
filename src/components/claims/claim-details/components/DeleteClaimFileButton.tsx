import gql from 'graphql-tag'
import * as React from 'react'
import { Mutation } from 'react-apollo'

import { Button } from 'semantic-ui-react'

const CLAIM_FILES_QUERY = gql`
  query ClaimFilesQuery($id: ID!) {
    claim(id: $id) {
      claimFiles {
        claimFileId
        fileUploadUrl
        category
      }
    }
  }
`

const MARK_CLAIM_FILE_AS_DELETED = gql`
  mutation markClaimFileAsDeleted($claimId: ID!, $claimFileId: ID!) {
    markClaimFileAsDeleted(claimId: $claimId, claimFileId: $claimFileId)
  }
`

export class DeleteButton extends React.Component<{
  claimId: string
  claimFileId: string
  showNotification: (data: any) => void
}> {
  public render() {
    return (
      <Mutation
        mutation={MARK_CLAIM_FILE_AS_DELETED}
        refetchQueries={() => [
          {
            query: CLAIM_FILES_QUERY,
            variables: {
              id: this.props.claimId,
            },
          },
        ]}
      >
        {(mutation, { loading }) => (
          <>
            <Button
              disabled={loading}
              onClick={() => {
                window.confirm('Are you sure you want to delete this file?')
                this.handleClick(mutation)
              }}
            >
              Delete
            </Button>
          </>
        )}
      </Mutation>
    )
  }

  private handleClick = (mutation) => {
    mutation({
      variables: {
        claimId: this.props.claimId,
        claimFileId: this.props.claimFileId,
      },
    })
      .then(() => {
        this.props.showNotification({
          message: 'File has been deleted',
          header: 'Success',
          type: 'olive',
        })
      })
      .catch((error) => {
        this.props.showNotification({
          message: error.message,
          header: 'Error',
          type: 'red',
        })
        throw error
      })
  }
}
