import { Contract, Quote } from 'api/generated/graphql'
import { BaseDatePicker } from 'components/shared/inputs/DatePicker'
import {
  addAgreementFromQuoteOptions,
  useAddAgreementFromQuote,
} from 'graphql/use-add-agreement-from-quote'
import { useContracts } from 'graphql/use-contracts'
import { Button } from 'hedvig-ui/button'
import React, { useState } from 'react'
import { Checkbox } from 'semantic-ui-react'
import { noopFunction } from 'utils'
import { BottomSpacerWrapper, ErrorMessage } from './common'

const getContract = (contracts, quote): Contract => {
  return contracts.find((contract) =>
    contract.agreements.some(
      (agreement) => agreement.id === quote.originatingProductId,
    ),
  )
}

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
  const contract = getContract(contracts, quote)
  if (!loading && !contract) {
    return <>Cannot active quote without Originating product id</>
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
              <BaseDatePicker
                value={activeFrom}
                onChange={(value) => {
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
                <BaseDatePicker
                  value={previousAgreementActiveTo}
                  onChange={(value) => {
                    if (onWipChange) {
                      onWipChange(true)
                    }
                    setPreviousAgreementActiveTo(value)
                  }}
                  maxDate={activeFrom}
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
