import { Button as MuiButton, MenuItem as MuiMenuItem } from '@material-ui/core'
import { ClaimType } from 'api/generated/graphql'
import { format, parseISO } from 'date-fns'
import { Field, Form, Formik } from 'formik'
import gql from 'graphql-tag'
import { FormikDateTimePicker } from 'hedvig-ui/date-time-picker'
import React from 'react'
import { Mutation } from 'react-apollo'
import styled from 'react-emotion'
import { connect } from 'react-redux'
import { showNotification as createShowNotificationAction } from 'store/actions/notificationsActions'
import { sleep } from 'utils/sleep'

import { FieldSelect } from 'components/shared/inputs/FieldSelect'
import { TextField } from 'components/shared/inputs/TextField'
import { Paper } from 'components/shared/Paper'

export const TYPE_FRAGMENT = `
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
        ... on NotCoveredClaim {
          date
        }
        ... on ConfirmedFraudClaim {
          date
        }
        ... on TestClaim {
          date
        }
        ... on LiabilityClaim {
          date
          location
        }
        ... on FireDamageClaim {
          date
          location
        }
        ... on ApplianceClaim {
          date
          location
          item
        }
        ... on LegalProtectionClaim {
          date
        }
        ... on WaterDamageBathroomClaim {
          date
        }
        ... on WaterDamageBathroomClaim {
          date
        }
        ... on BurglaryClaim {
          location
          date
          item
          policeReport
          receipt
        }
        ... on FloodingClaim {
          date
        }
        ... on EarthquakeClaim {
          date
        }
        ... on InstallationsClaim {
          date
          location
          item
        }
        ... on SnowPressureClaim {
          date
        }
        ... on StormDamageClaim {
          date
        }
        ... on VerminAndPestsClaim {
          date
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

const hasLocation = (typename: ClaimTypes): boolean => {
  return [
    ClaimTypes.TheftClaim,
    ClaimTypes.AccidentalDamageClaim,
    ClaimTypes.AssaultClaim,
    ClaimTypes.TravelAccidentClaim,
    ClaimTypes.LuggageDelayClaim,
    ClaimTypes.LiabilityClaim,
    ClaimTypes.FireDamageClaim,
    ClaimTypes.ApplianceClaim,
    ClaimTypes.BurglaryClaim,
    ClaimTypes.InstallationsClaim,
  ].includes(typename)
}

const hasItem = (typename: ClaimTypes): boolean => {
  return [
    ClaimTypes.TheftClaim,
    ClaimTypes.AccidentalDamageClaim,
    ClaimTypes.ApplianceClaim,
    ClaimTypes.BurglaryClaim,
    ClaimTypes.InstallationsClaim,
  ].includes(typename)
}

const hasPoliceReport = (typename: ClaimTypes): boolean => {
  return [
    ClaimTypes.TheftClaim,
    ClaimTypes.AccidentalDamageClaim,
    ClaimTypes.AssaultClaim,
    ClaimTypes.TravelAccidentClaim,
    ClaimTypes.BurglaryClaim,
  ].includes(typename)
}

const hasReceipt = (typename: ClaimTypes): boolean => {
  return [
    ClaimTypes.AccidentalDamageClaim,
    ClaimTypes.TravelAccidentClaim,
    ClaimTypes.BurglaryClaim,
  ].includes(typename)
}

const hasTicket = (typename: ClaimTypes): boolean => {
  return typename === ClaimTypes.LuggageDelayClaim
}

export enum ClaimTypes {
  AccidentalDamageClaim = 'AccidentalDamageClaim',
  ApplianceClaim = 'ApplianceClaim',
  AssaultClaim = 'AssaultClaim',
  BurglaryClaim = 'BurglaryClaim',
  ConfirmedFraudClaim = 'ConfirmedFraudClaim',
  EarthquakeClaim = 'EarthquakeClaim',
  FireDamageClaim = 'FireDamageClaim',
  FloodingClaim = 'FloodingClaim',
  InstallationsClaim = 'InstallationsClaim',
  LegalProtectionClaim = 'LegalProtectionClaim',
  LiabilityClaim = 'LiabilityClaim',
  LuggageDelayClaim = 'LuggageDelayClaim',
  NotCoveredClaim = 'NotCoveredClaim',
  SnowPressureClaim = 'SnowPressureClaim',
  StormDamageClaim = 'StormDamageClaim',
  TestClaim = 'TestClaim',
  TheftClaim = 'TheftClaim',
  TravelAccidentClaim = 'TravelAccidentClaim',
  VerminAndPestsClaim = 'VerminAndPestsClaim',
  WaterDamageClaim = 'WaterDamageClaim',
  WaterDamageBathroomClaim = 'WaterDamageBathroomClaim',
  WaterDamageKitchenClaim = 'WaterDamageKitchenClaim',
}

interface ClaimTypeProps {
  type?: ClaimType | null
  claimId: string
  refetchPage: () => Promise<any>
}

const SubmitButton = MuiButton

const ClaimTypeInformationForm = styled(Form)({
  marginTop: '1rem',
})

const handleError = (showNotification: (data: any) => void) => () => {
  showNotification({
    type: 'error',
    message: 'Something went wrong, notify the tech team plz',
    headline: '):',
  })
}
const ClaimTypeComponent: React.FC<ClaimTypeProps & {
  showNotification: (data: any) => void
}> = ({ type, claimId, refetchPage, showNotification }) => {
  const [isSetClaimTypeLoading, setSetClaimTypeLoading] = React.useState(false)

  return (
    <Mutation
      mutation={SET_CLAIM_TYPE_MUTATION}
      onError={handleError(showNotification)}
    >
      {(setClaimType, setTypeMutation) => (
        <Mutation
          mutation={SET_CLAIM_INFORMATION}
          onError={handleError(showNotification)}
        >
          {(setClaimInformation, setInfoMutation) => (
            <Paper>
              <h3>Type</h3>
              <Formik<{ selectedType?: ClaimTypes | '' }>
                initialValues={{
                  selectedType: (type?.__typename as ClaimTypes) || '',
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  if (!values.selectedType) {
                    return
                  }
                  setSetClaimTypeLoading(true)
                  await setClaimType({
                    variables: { id: claimId, type: values.selectedType },
                  })
                  await sleep(2000) // wait for claims service to propagate changes :(
                  await refetchPage()
                  setSubmitting(false)
                  setSetClaimTypeLoading(false)
                }}
              >
                {({ isValid }) => (
                  <Form>
                    <div>
                      <Field component={FieldSelect} name="selectedType">
                        <MuiMenuItem disabled value="">
                          Select a type...
                        </MuiMenuItem>
                        {Object.keys(ClaimTypes).map((t) => (
                          <MuiMenuItem key={t} value={t}>
                            {t}
                          </MuiMenuItem>
                        ))}
                      </Field>
                    </div>
                    <div>
                      <SubmitButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={
                          !isValid ||
                          setTypeMutation.loading ||
                          isSetClaimTypeLoading
                        }
                      >
                        {setTypeMutation.loading || isSetClaimTypeLoading ? (
                          <>...</>
                        ) : (
                          <>Set type</>
                        )}
                      </SubmitButton>
                    </div>
                  </Form>
                )}
              </Formik>
              {type ? (
                <Formik<{
                  location?: string
                  date: Date | null
                  item?: string
                  policeReport?: string
                  receipt?: string
                  ticket?: string
                }>
                  initialValues={{
                    location: (type as any).location || '',
                    date: type.date ? parseISO(type.date) : null,
                    item: (type as any).item || '',
                    policeReport: (type as any).policeReport || '',
                    receipt: (type as any).receipt || '',
                    ticket: (type as any).ticket || '',
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setClaimInformation({
                      variables: {
                        id: claimId,
                        claimInformation: {
                          ...values,
                          date:
                            values.date && format(values.date, 'yyyy-MM-dd'),
                        },
                      },
                    })
                    setSubmitting(false)
                  }}
                >
                  {({ isValid }) => (
                    <ClaimTypeInformationForm>
                      {hasLocation(type.__typename! as ClaimTypes) && (
                        <div>
                          <Field
                            component={TextField}
                            name="location"
                            placeholder="Location"
                          />
                        </div>
                      )}
                      <div>
                        <Field
                          component={FormikDateTimePicker}
                          name="date"
                          placeholder="Date"
                        />
                      </div>
                      {hasItem(type.__typename! as ClaimTypes) && (
                        <div>
                          <Field
                            component={TextField}
                            name="item"
                            placeholder="Item"
                          />
                        </div>
                      )}
                      {hasPoliceReport(type.__typename! as ClaimTypes) && (
                        <div>
                          <Field
                            component={TextField}
                            name="policeReport"
                            placeholder="Police Report"
                          />
                        </div>
                      )}
                      {hasReceipt(type.__typename! as ClaimTypes) && (
                        <div>
                          <Field
                            component={TextField}
                            name="receipt"
                            placeholder="Receipt"
                          />
                        </div>
                      )}
                      {hasTicket(type.__typename! as ClaimTypes) && (
                        <div>
                          <Field
                            component={TextField}
                            name="ticket"
                            placeholder="Ticket"
                          />
                        </div>
                      )}
                      <div>
                        <SubmitButton
                          type="submit"
                          variant="contained"
                          color="primary"
                          disabled={
                            !isValid ||
                            setInfoMutation.loading ||
                            isSetClaimTypeLoading
                          }
                        >
                          {setInfoMutation.loading ? (
                            <>...</>
                          ) : (
                            <>Update claim information</>
                          )}
                        </SubmitButton>
                      </div>
                    </ClaimTypeInformationForm>
                  )}
                </Formik>
              ) : null}
            </Paper>
          )}
        </Mutation>
      )}
    </Mutation>
  )
}

const ClaimTypeForm = connect(null, {
  showNotification: createShowNotificationAction,
})(ClaimTypeComponent)

export { ClaimTypeForm }
