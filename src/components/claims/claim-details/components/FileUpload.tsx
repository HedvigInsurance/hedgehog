import * as React from 'react'
import styled from 'react-emotion'
import { colors } from '@hedviginsurance/brand'
import Dropzone from 'react-dropzone'
import actions from 'store/actions'
import { connect } from 'react-redux'

const UploadClaimFileWrapper = styled('div')({
  padding: '4rem',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid rgba(0,0,0,0.08)',
  minHeight: '20rem',
})

const UploadClaimFileHeader = styled('h3')({})

export const Button = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 'inherit',
  font: 'inherit',
  padding: '4rem',
  border: '1px solid',
  borderColor: colors.DARK_GRAY,
  borderRadius: '5px',
  color: colors.BLACK,
  background: colors.WHITE,
  cursor: 'pointer',
  textDecoration: 'none',
  '&:hover, &:focus': {
    color: colors.GREEN,
    textDecoration: 'none',
  },
  '&:focus, &:hover': {
    outline: 'none',
    boxShadow: 'none',
  },
})

const FileUploadContainer = styled('div')({
  padding: '2rem',
})

class FileUploadComponent extends React.Component<{
  claimId: string
  memberId: string
  showNotification: (data: any) => void
  onUploaded: () => void
}> {
  render() {
    return (
      <>
        <UploadClaimFileWrapper>
          <UploadClaimFileHeader>Upload files here</UploadClaimFileHeader>
          <FileUploadContainer>
            <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps, isDragActive }) => (
                <Button {...getRootProps()} css={undefined}>
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
    var claimFiles = new FormData()

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
          message: 'upload successful!',
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
