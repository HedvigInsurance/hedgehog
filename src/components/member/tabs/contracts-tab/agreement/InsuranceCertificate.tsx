import { Contract, GenericAgreement } from 'api/generated/graphql'
import {
  regenerateCertificateOptions,
  useRegenerateCertificate,
} from 'graphql/use-regenerate-certificate'
import { Button, ButtonLink, ButtonsGroup } from 'hedvig-ui/button'
import { ThirdLevelHeadline } from 'hedvig-ui/typography'
import React from 'react'
import Dropzone from 'react-dropzone'
import { Notification } from 'store/actions/notificationsActions'

export const InsuranceCertificate: React.FunctionComponent<{
  contract: Contract
  agreement: GenericAgreement
  showNotification: (data: Notification) => void
  refetch: () => Promise<void>
}> = ({ contract, agreement, showNotification, refetch }) => {
  const [regenerateCertificate, { loading }] = useRegenerateCertificate(
    contract,
  )

  const onUpload = (files, agreementId) => {
    const certificateForm = new FormData()
    certificateForm.set('file', files[0])

    fetch(`/_/agreements/${agreementId}/certificates`, {
      method: 'POST',
      body: certificateForm,
    })
      .then(() => {
        showNotification({
          type: 'olive',
          header: 'Success',
          message: 'Successfully uploaded certificate.',
        })
      })
      .catch((error) => {
        showNotification({
          type: 'red',
          header: 'Unable to upload certificate',
          message: error.message,
        })
        throw error
      })
      .then(() => refetch())
  }

  return (
    <>
      <ThirdLevelHeadline>Insurance Certificate</ThirdLevelHeadline>
      <ButtonsGroup>
        {agreement.certificateUrl && (
          <ButtonLink
            variation={'primary'}
            fullWidth
            target="_blank"
            href={agreement.certificateUrl!!}
          >
            View
          </ButtonLink>
        )}
        <Button
          disabled={loading}
          variation="third"
          fullWidth
          onClick={() => {
            if (
              !window.confirm(
                'Are you sure you want to regenerate the certificate?',
              )
            ) {
              return
            }
            regenerateCertificate(regenerateCertificateOptions(agreement.id))
              .then(() => {
                showNotification({
                  header: 'Success',
                  message: 'Successfully regenerate the certificate',
                  type: 'olive',
                })
              })
              .catch((error) => {
                showNotification({
                  header: 'Error',
                  message: error.message,
                  type: 'red',
                })
                throw error
              })
          }}
        >
          Regenerate
        </Button>
        <Dropzone onDrop={(files) => onUpload(files, agreement.id)}>
          {({ getRootProps, getInputProps }) => (
            <Button
              fullWidth={!!agreement.certificateUrl}
              halfWidth={!agreement.certificateUrl}
              variation="third"
              {...(getRootProps() as any)}
            >
              <input {...getInputProps()} />
              Upload New
            </Button>
          )}
        </Dropzone>
      </ButtonsGroup>
    </>
  )
}
