import { ClaimSource, useCreateClaimMutation } from 'api/generated/graphql'
import { ClaimListHeader } from 'components/claims/claims-list/components/ClaimListHeader'
import { ClaimListItem } from 'components/claims/claims-list/components/ClaimListItem'
import { RefreshButton } from 'components/member/tabs/shared/refresh-button'
import { format } from 'date-fns'
import { useGetMemberClaims } from 'graphql/use-get-member-claims'
import { FadeIn } from 'hedvig-ui/animations/fade-in'
import {
  LoadingMessage,
  StandaloneMessage,
} from 'hedvig-ui/animations/standalone-message'
import { Button } from 'hedvig-ui/button'
import { DateTimePicker } from 'hedvig-ui/date-time-picker'
import { EnumDropdown } from 'hedvig-ui/dropdown'
import { Spacing } from 'hedvig-ui/spacing'
import { MainHeadline } from 'hedvig-ui/typography'
import React from 'react'
import { ArrowRepeat } from 'react-bootstrap-icons'
import styled from 'react-emotion'
import { Table } from 'semantic-ui-react'
import { WithShowNotification } from 'store/actions/notificationsActions'
import { withShowNotification } from 'utils/notifications'

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const FormWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  height: 100%;
`

const ClaimsTabComponent: React.FC<{
  memberId: string
} & WithShowNotification> = ({ memberId, showNotification }) => {
  const [claims, { loading, refetch }] = useGetMemberClaims(memberId)
  const [
    createClaim,
    { loading: createClaimLoading },
  ] = useCreateClaimMutation()

  const [showForm, setShowForm] = React.useState(false)
  const [claimSource, setClaimSource] = React.useState<ClaimSource | null>(null)
  const [claimDate, setClaimDate] = React.useState<Date | null>(null)

  if (loading || !claims) {
    return <LoadingMessage paddingTop="25vh" />
  }

  if (claims.length === 0) {
    return (
      <StandaloneMessage paddingTop="10vh">
        Claims list is empty
      </StandaloneMessage>
    )
  }

  return (
    <FadeIn>
      <HeaderWrapper>
        <MainHeadline>
          Claims
          <RefreshButton onClick={() => refetch()} loading={loading}>
            <ArrowRepeat />
          </RefreshButton>
        </MainHeadline>

        <FormWrapper>
          {showForm ? (
            <>
              <EnumDropdown
                enumToSelectFrom={ClaimSource}
                placeholder={'Claim Source'}
                setValue={(source) => setClaimSource(source)}
              />
              <Spacing left={'small'}>
                <DateTimePicker
                  disabled={createClaimLoading}
                  date={claimDate}
                  fullWidth={true}
                  setDate={(date) => setClaimDate(date)}
                  placeholder="Notification date"
                  maxDate={new Date()}
                />
              </Spacing>
              <Spacing left={'small'}>
                <Button
                  disabled={createClaimLoading}
                  variation="danger"
                  color="danger"
                  onClick={() => {
                    setShowForm(false)
                    setClaimDate(null)
                    setClaimSource(null)
                  }}
                >
                  Cancel
                </Button>
              </Spacing>
              <Spacing left={'small'}>
                <Button
                  disabled={
                    claimSource === null ||
                    claimDate === null ||
                    createClaimLoading
                  }
                  variation="success"
                  color="success"
                  onClick={() => {
                    if (claimSource === null || claimDate === null) {
                      return
                    }

                    createClaim({
                      variables: {
                        memberId,
                        date: format(claimDate, "yyyy-MM-dd'T'HH:mm:ss"),
                        source: claimSource,
                      },
                    })
                      .then(() => {
                        setShowForm(false)
                        setClaimDate(null)
                        setClaimSource(null)
                        refetch().then(() => {
                          showNotification({
                            header: 'Success!',
                            message: 'Claim created',
                            type: 'green',
                          })
                        })
                      })
                      .catch((error) => {
                        showNotification({
                          type: 'red',
                          header: 'Error',
                          message: error.message,
                        })
                        throw error
                      })
                  }}
                >
                  Save
                </Button>
              </Spacing>
            </>
          ) : (
            <Button
              variation="primary"
              color="primary"
              onClick={() => setShowForm(true)}
            >
              Add new claim
            </Button>
          )}
        </FormWrapper>
      </HeaderWrapper>
      <Table celled selectable>
        <ClaimListHeader />

        <Table.Body>
          {claims.map((item, index) => (
            <ClaimListItem key={item.id} item={item} index={index} />
          ))}
        </Table.Body>
      </Table>
    </FadeIn>
  )
}

export const ClaimsTab = withShowNotification(ClaimsTabComponent)
