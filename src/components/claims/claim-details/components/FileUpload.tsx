import React from 'react'
import Dropzone from 'react-dropzone'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import actions from 'store/actions'

const UploadClaimFileWrapper = styled('div')({
  padding: '4rem',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(0,0,0,0.08)',
  minHeight: '20rem',
})

const UploadClaimFileHeader = styled('h3')({})

export const Button = styled('button')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'inherit',
  font: 'inherit',
  padding: '4rem',
  border: '1px solid',
  borderColor: theme.border,
  borderRadius: '5px',
  color: theme.foreground,
  background: theme.backgroundTransparent,
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover, &:focus': {
    color: theme.accent,
    textDecoration: 'none',
  },
  '&:focus, &:hover': {
    outline: 'none',
    boxShadow: 'none',
  },
}))

const FileUploadContainer = styled('div')({
  padding: '2rem',
})

class FileUploadComponent extends React.Component<{
  claimId: string
  memberId: string
  showNotification: (data: any) => void
  onUploaded: () => void
}> {
  public render() {
    return (
      <>
        <UploadClaimFileWrapper>
          <UploadClaimFileHeader>Upload files here</UploadClaimFileHeader>
          <FileUploadContainer>
            <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                // @ts-ignore
                <Button {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive
                    ? 'Drop files here to upload them!'
                    : 'Click here or drag files to upload!'}
                </Button>
              )}
            </Dropzone>
          </FileUploadContainer>
        </UploadClaimFileWrapper>
      </>
    )
  }

  private onDrop = (acceptedFiles) => {
    const claimFiles = new FormData()

    for (const file of acceptedFiles) {
      claimFiles.append('files', file)
    }
    claimFiles.append('memberId', this.props.memberId)

    fetch(`/api/claims/${this.props.claimId}/claimFiles`, {
      method: 'POST',
      body: claimFiles,
    })
      .then(() => {
        this.props.showNotification({
          message: 'Upload successful!',
          header: 'Approved',
          type: 'olive',
        })
        this.props.onUploaded()
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

const mapActions = { ...actions.notificationsActions }

export const FileUpload = connect(null, mapActions)(FileUploadComponent)
