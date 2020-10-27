import Button from '@material-ui/core/Button'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ClaimsList from 'components/claims/claims-list/ClaimsList'
import MaterialModal from 'components/shared/modals/MaterialModal'
import { ActionMap, Container } from 'constate'
import { format } from 'date-fns'
import gql from 'graphql-tag'
import { FadeIn } from 'hedvig-ui/animations/fade-in'
import { StandaloneMessage } from 'hedvig-ui/animations/standalone-message'
import { DateTimePicker } from 'hedvig-ui/date-time-picker'
import React from 'react'
import { Mutation } from 'react-apollo'
import styled, { css } from 'react-emotion'
import { history } from 'store'

const buttonStyle = css({
  width: '130px',
  alignSelf: 'flex-end',
})

const InlineFlexButton = styled('div')({
  display: 'flex',
  justifyContent: 'flex-end',
})

const InlineFlex = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
})

const types = [
  {
    value: 'EMAIL',
    label: 'Email',
  },
  {
    value: 'INTERCOM',
    label: 'Intercom',
  },
  {
    value: 'PHONE',
    label: 'Phone',
  },
  {
    value: 'CHAT',
    label: 'Chat',
  },
]

const CREATE_CLAIM_MUTATION = gql`
  mutation createClaim(
    $memberId: ID!
    $date: LocalDateTime!
    $source: ClaimSource!
  ) {
    createClaim(memberId: $memberId, date: $date, source: $source)
  }
`

interface ClaimsTabProps {
  classes: any
  memberClaims: object[]
  sortClaimsList?: () => void
  memberId: string
}

interface State {
  open: boolean
  date?: any
  value: string
}

interface Actions {
  handleClose: () => void
  handleOpen: () => void
  handleClaimSubmit: (mutation: any) => void
  typeChangeHandler: (event: any) => void
  dateChangeHandler?: (type: string, e: any, value: any) => void
}

const ClaimsTab: React.FC<ClaimsTabProps> = (props) => {
  return (
    <FadeIn>
      <Container<State, ActionMap<State, Actions>>
        initialState={{
          open: false,
          date: new Date(),
          value: 'EMAIL',
        }}
        actions={{
          handleClose: () => (_) => ({ open: false }),
          handleOpen: () => (_) => ({ open: true }),
          handleClaimSubmit: (mutation) => (state) => {
            mutation({
              variables: {
                memberId: props.memberId,
                date: format(state.date, "yyyy-MM-dd'T'HH:mm:ss"),
                source: state.value,
              },
            }).then((response) => {
              history.push(
                `/claims/${response.data.createClaim}/members/${props.memberId}`,
              )
            })
            return { date: new Date(), value: 'EMAIL', open: false }
          },
          typeChangeHandler: (event) => (_) => ({
            value: event.target.value,
          }),
          dateChangeHandler: (date) => {
            return {
              date,
            }
          },
        }}
      >
        {({
          handleClose,
          handleOpen,
          dateChangeHandler,
          typeChangeHandler,
          handleClaimSubmit,
          open,
          value,
          date,
        }) => (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              className={buttonStyle}
            >
              Add new claim
            </Button>
            {props.memberClaims.length > 0 ? (
              <ClaimsList
                claims={{ list: props.memberClaims }}
                sortClaimsList={props.sortClaimsList}
              />
            ) : (
              <StandaloneMessage paddingTop="10vh">
                Claims list is empty
              </StandaloneMessage>
            )}
            <MaterialModal handleClose={handleClose} open={open}>
              <Typography variant="h5" id="modal-title">
                Create claim
              </Typography>
              <Typography variant="subtitle1" id="simple-modal-description">
                Choose notification date and type of claim.
              </Typography>
              <InlineFlex>
                <TextField
                  id="filled-select-currency"
                  select
                  label="Select"
                  value={value}
                  onChange={typeChangeHandler}
                  helperText="Please select claim type"
                  margin="normal"
                  variant="filled"
                >
                  {types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <strong>Notification date</strong>
                <DateTimePicker
                  date={date}
                  setDate={dateChangeHandler as any}
                  placeholder="Notification date"
                  maxDate={new Date()}
                />
              </InlineFlex>
              <InlineFlexButton>
                <Mutation mutation={CREATE_CLAIM_MUTATION}>
                  {(createClaim) => (
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleClaimSubmit(createClaim)}
                      className={buttonStyle}
                    >
                      Save
                    </Button>
                  )}
                </Mutation>
              </InlineFlexButton>
            </MaterialModal>
          </>
        )}
      </Container>
    </FadeIn>
  )
}

export default ClaimsTab
