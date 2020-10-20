import { Contract, Quote } from 'api/generated/graphql'
import {
  addAgreementFromQuoteOptions,
  useAddAgreementFromQuote,
} from 'graphql/use-add-agreement-from-quote'
import { useContracts } from 'graphql/use-contracts'
import { Button } from 'hedvig-ui/button'
import { DateTimePicker } from 'hedvig-ui/date-time-picker'
import React, { useState } from 'react'
import { Checkbox } from 'semantic-ui-react'
import { noopFunction } from 'utils'
import { getContractByAgreementId } from 'utils/contract'
import { BottomSpacerWrapper, ErrorMessage } from './common'

const getInitialActiveFrom = (contract: Contract): Date | null =>
  contract.hasPendingAgreement ? null : new Date()

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
  const [useGap, setUseGap] = useState(false)
  const [contracts, { loading }] = useContracts(memberId)
  if (!quote.originatingProductId) {
    return (
      <>
        Cannot active quote without <strong>Originating Product Id</strong>
      </>
    )
  }
  if (loading) {
    return null
  }
  const contract = getContractByAgreementId(
    contracts,
    quote.originatingProductId,
  )
  if (!contract) {
    return <>Cannot find the contract for the quote, please contact Tech</>
  }
  if (contract.hasPendingAgreement && contract.isTerminated) {
    return <>Cannot active quote for a pending contract that is terminated</>
  }
  const [activeFrom, setActiveFrom] = useState(() =>
    getInitialActiveFrom(contract),
  )
  const [
    previousAgreementActiveTo,
    setPreviousAgreementActiveTo,
  ] = useState<Date | null>(null)

  const [addAgreement, addAgreementMutation] = useAddAgreementFromQuote()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        if (
          addAgreementMutation.loading ||
          (contract.hasPendingAgreement && activeFrom) ||
          (!contract.hasPendingAgreement && !activeFrom) ||
          !confirm('Are you sure you want to activate?')
        ) {
          return
        }
        await addAgreement(
          addAgreementFromQuoteOptions(
            contract,
            activeFrom,
            null,
            previousAgreementActiveTo,
            quote,
          ),
        )
        if (onSubmitted) {
          onSubmitted()
        }
      }}
    >
      {!contract.hasPendingAgreement && (
        <>
          <BottomSpacerWrapper>
            <div>
              <strong>Activation date</strong>
            </div>
            <div>
              <DateTimePicker
                date={activeFrom || new Date()}
                setDate={(value) => {
                  if (onWipChange) {
                    onWipChange(true)
                  }
                  setActiveFrom(value)
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
                  setPreviousAgreementActiveTo(null)
                }
                setUseGap(!!checked)
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
                <DateTimePicker
                  date={previousAgreementActiveTo || new Date()}
                  setDate={(value) => {
                    if (onWipChange) {
                      onWipChange(true)
                    }
                    setPreviousAgreementActiveTo(value)
                  }}
                  maxDate={activeFrom ?? undefined}
                />
              </div>
            </BottomSpacerWrapper>
          )}
        </>
      )}
      {contract.hasPendingAgreement && (
        <div>
          With a <strong>Pending</strong> contract the <strong>Pending</strong>{' '}
          agreement will be replaced upon activation.
        </div>
      )}

      {!addAgreementMutation.data?.addAgreementFromQuote ? (
        <Button
          variation="success"
          type="submit"
          fullWidth
          disabled={addAgreementMutation.loading}
        >
          {contract.hasPendingAgreement ? 'Replace' : 'Activate'}
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

      {addAgreementMutation.error && (
        <ErrorMessage>
          {JSON.stringify(addAgreementMutation.error, null, 2)}
        </ErrorMessage>
      )}
    </form>
  )
}
