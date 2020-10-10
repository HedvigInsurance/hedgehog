import { Contract, GenericAgreement, QuoteState } from 'api/generated/graphql'
import {
  createQuoteFromAgreementOptions,
  useCreateQuoteFromAgreement,
} from 'graphql/use-create-quote'
import { useQuotes } from 'graphql/use-get-quotes'
import { Button } from 'hedvig-ui/button'
import { ThirdLevelHeadline } from 'hedvig-ui/typography'
import React from 'react'
import { Notification } from 'store/actions/notificationsActions'
import { isExpired } from 'utils/quote'

export const CreateQuoteFromAgreement: React.FunctionComponent<{
  agreement: GenericAgreement
  contract: Contract
  showNotification: (data: Notification) => void
}> = ({ agreement, contract, showNotification }) => {
  const [createQuote] = useCreateQuoteFromAgreement()
  const [quotes, { loading: loadingQuotes }] = useQuotes(
    contract.holderMemberId,
  )

  if (loadingQuotes) {
    return null
  }

  const quoteAlreadyExists = quotes
    .filter((quote) => quote.state === QuoteState.Quoted && !isExpired(quote))
    .map((quote) => quote.originatingProductId)
    .includes(agreement.id)

  return (
    <>
      <ThirdLevelHeadline>Create Quote</ThirdLevelHeadline>
      <>
        {quoteAlreadyExists ? (
          <>Agreement already has an existing quote</>
        ) : (
          <Button
            variation="primary"
            onClick={() => {
              if (!window.confirm(`Create new quote?`)) {
                return
              }
              createQuote(createQuoteFromAgreementOptions(agreement, contract))
                .then(() => {
                  showNotification({
                    type: 'olive',
                    header: 'Success',
                    message: `Successfully added a quote, go to the quotes tab to view it`,
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
            Create a new quote
          </Button>
        )}
      </>
    </>
  )
}
