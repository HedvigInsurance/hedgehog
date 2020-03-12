import { useMutation } from '@apollo/react-hooks'
import { Quote } from 'api/generated/graphql'
import { gql } from 'apollo-boost'
import { BaseDatePicker } from 'components/shared/inputs/DatePicker'
import { QUOTES_QUERY } from 'graphql/use-quotes'
import { Button } from 'hedvig-ui/button'
import * as React from 'react'
import { Checkbox } from 'semantic-ui-react'
import { noopFunction } from 'utils'
import { BottomSpacerWrapper, ErrorMessage } from './common'

const ACTIVATE_MUTATION = gql`
  mutation ActivateQuote(
    $id: ID!
    $activationDate: LocalDate!
    $terminationDate: LocalDate
  ) {
    activateQuote(
      id: $id
      activationDate: $activationDate
      terminationDate: $terminationDate
    ) {
      id
      originatingProductId
      signedProductId
    }
  }
`
export const QuoteActivation: React.FC<{
  quote: Quote
  memberId
  onSubmitted?: () => void
  onWipChange?: (isWip: boolean) => void
}> = ({
  quote,
  memberId,
  onSubmitted = noopFunction,
  onWipChange = noopFunction,
}) => {
  const [activationDate, setActivationDate] = React.useState<Date | null>(
    new Date(),
  )
  const [terminationDate, setTerminationDate] = React.useState<Date | null>(
    null,
  )
  const [useGap, setUseGap] = React.useState(false)

  const [activateQuote, activationMutation] = useMutation(ACTIVATE_MUTATION, {
    refetchQueries: () => [
      {
        query: QUOTES_QUERY,
        variables: { memberId },
      },
    ],
  })

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        if (
          activationMutation.loading ||
          !activationDate ||
          !confirm('Are you sure you want to activate?')
        ) {
          return
        }
        await activateQuote({
          variables: {
            id: quote.id,
            activationDate: activationDate.toISOString().slice(0, 10),
            terminationDate: useGap
              ? terminationDate?.toISOString()?.slice(0, 10)
              : null,
          },
        })
        if (onSubmitted) {
          onSubmitted()
        }
      }}
    >
      <BottomSpacerWrapper>
        <div>
          <strong>Activation date</strong>
        </div>
        <div>
          <BaseDatePicker
            value={activationDate}
            onChange={(value) => {
              if (onWipChange) {
                onWipChange(true)
              }
              setActivationDate(value)
            }}
          />
        </div>
      </BottomSpacerWrapper>

      <BottomSpacerWrapper>
        <Checkbox
          onChange={(_, { checked }) => {
            if (onWipChange) {
              onWipChange(true)
            }
            if (!checked) {
              setTerminationDate(null)
            }
            setUseGap(checked!)
          }}
          label="Create gap between insurances"
          checked={useGap}
        />
      </BottomSpacerWrapper>

      {useGap && (
        <BottomSpacerWrapper>
          <div>
            <strong>Terminate current insurance at</strong>
          </div>
          <div>
            <BaseDatePicker
              value={terminationDate}
              onChange={(value) => {
                if (onWipChange) {
                  onWipChange(true)
                }
                setTerminationDate(value)
              }}
              maxDate={activationDate}
            />
          </div>
        </BottomSpacerWrapper>
      )}

      {!activationMutation.data?.activateQuote ? (
        <Button
          variation="success"
          type="submit"
          fullWidth
          disabled={activationMutation.loading}
        >
          Activate
        </Button>
      ) : (
        <Button
          variation="primary"
          fullWidth
          onClick={(e) => {
            e.preventDefault()
            window.location.reload()
          }}
        >
          Reload
        </Button>
      )}

      {activationMutation.error && (
        <ErrorMessage>
          {JSON.stringify(activationMutation.error, null, 2)}
        </ErrorMessage>
      )}
    </form>
  )
}
