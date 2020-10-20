import { WideModal } from 'components/shared/modals/WideModal'
import TableFields from 'components/shared/table-fields/TableFields'
import { FraudulentStatusEdit } from 'lib/fraudulentStatus'
import { dateTimeFormatter, getFieldName, getFieldValue } from 'lib/helpers'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useState } from 'react'
import { Button, Form, Header, Icon, Modal, Table } from 'semantic-ui-react'
import InsuranceTrace from './insurance-trace/InsuranceTrace'
import {
  getEditMemberInfoOptions,
  useEditMemberInfo,
} from 'graphql/use-edit-member-info'
import {
  getSetFraudulentStatusOptions,
  useSetFraudulentStatus,
} from 'graphql/use-set-fraudulent-status'
import { withShowNotification } from 'utils/notifications'

const memberFieldFormatters = {
  signedOn: (date) => dateTimeFormatter(date, 'yyyy-MM-dd HH:mm:ss'),
  createdOn: (date) => dateTimeFormatter(date, 'yyyy-MM-dd HH:mm:ss'),
}

const DetailsTabComponent = (props) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [editMemberInfoRequest, setEditMemberInfoRequest] = useState({
    memberId: props.member.memberId,
  })
  const [editingFraud, setEditFraud] = useState(false)
  const [fraudStatus, setFraudStatus] = useState(null)
  const [fraudDescription, setFraudDescription] = useState(null)
  const [editMemberInfo] = useEditMemberInfo()
  const [setFraudulentStatus] = useSetFraudulentStatus()

  const handleOpen = () => setModalOpen(true)

  const handleClose = () => setModalOpen(false)

  const isDisabled = (field) => {
    switch (field.toLowerCase()) {
      case 'memberid':
      case 'personalnumber':
      case 'birthdate':
      case 'signedon':
      case 'status':
      case 'createdon':
        return true
      default:
        return false
    }
  }

  const handleChange = (field) => (e) => {
    const editedMemberDetails = editMemberInfoRequest
    editedMemberDetails[field] = e.target.value
    setEditMemberInfoRequest(editedMemberDetails)
  }

  const handleCancel = () => {
    setEditMemberInfoRequest({
      memberId: props.member.memberId,
    })
    handleClose()
  }

  const handleSubmissionButton = () => {
    editMemberInfo(getEditMemberInfoOptions(editMemberInfoRequest)).then(() =>
      handleClose(),
    )
  }

  const {
    traceMemberInfo,
    fraudulentStatusDescription,
    fraudulentStatus,
    ...memberInfo
  } = props.member || {}

  const memberInfoWithoutSsn = {
    ...memberInfo,
    personalNumber: memberInfo.signedOn ? memberInfo.personalNumber : null,
  }

  delete memberInfoWithoutSsn.__typename

  return memberInfoWithoutSsn ? (
    <>
      <Table selectable>
        <Table.Body>
          <TableFields
            fields={memberInfoWithoutSsn}
            fieldFormatters={memberFieldFormatters}
          />
          <FraudulentStatusEdit
            getFraudStatusInfo={() => ({
              status: fraudStatus || fraudulentStatus,
              description: fraudDescription || fraudulentStatusDescription,
            })}
            setState={(val, fs, desc) => {
              setEditFraud(val)
              setFraudStatus(fs)
              setFraudDescription(desc)
            }}
            getState={() => editingFraud}
            action={(fraudulentStatus, fraudulentStatusDescription) => {
              setFraudulentStatus(
                getSetFraudulentStatusOptions(memberInfo.memberId, {
                  fraudulentStatus,
                  fraudulentStatusDescription,
                }),
              )
                .then(() => {
                  props.showNotification({
                    header: 'Success!',
                    message: 'Changed the fraudulent status',
                    type: 'green',
                  })
                })
                .catch((error) => {
                  props.showNotification({
                    header: 'Error',
                    message: error.message,
                    type: 'red',
                  })
                })
            }}
          />
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell colSpan="2">
              <WideModal
                className="scrolling"
                trigger={
                  <Button
                    floated="right"
                    icon
                    labelposition="left"
                    primary
                    size="medium"
                    onClick={() => handleOpen()}
                  >
                    <Icon name="edit" /> Edit Member
                  </Button>
                }
                open={modalOpen}
                onClose={() => handleClose()}
                basic
                size="small"
                dimmer="blurring"
              >
                <Header icon="edit" content="Edit Member" />
                <Modal.Content>
                  <Form inverted size="small">
                    <>
                      {Object.keys(memberInfoWithoutSsn).map((field) => (
                        <Form.Input
                          key={field}
                          label={getFieldName(field)}
                          disabled={isDisabled(field)}
                          defaultValue={getFieldValue(props.member[field])}
                          onChange={handleChange(field)}
                        />
                      ))}
                    </>
                    <Button.Group floated="right" labelposition="left">
                      <Button type="button" onClick={() => handleCancel()}>
                        Cancel
                      </Button>
                      <Button.Or />
                      <Button
                        type="button"
                        onClick={() => handleSubmissionButton()}
                        positive
                      >
                        Submit
                      </Button>
                    </Button.Group>
                  </Form>
                </Modal.Content>
              </WideModal>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
      <InsuranceTrace traceData={traceMemberInfo} />
    </>
  ) : (
    <Header>No member info</Header>
  )
}

DetailsTabComponent.propTypes = {
  member: PropTypes.object.isRequired,
}

export const DetailsTab = withShowNotification(DetailsTabComponent)
