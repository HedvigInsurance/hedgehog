import { Contract, GenericAgreement, QuoteState } from 'api/generated/graphql'
import {
  createQuoteFromAgreementOptions,
  useCreateQuoteFromAgreement,
} from 'graphql/use-create-quote'
import { expiredPredicate, useQuotes } from 'graphql/use-quotes'
import { Button } from 'hedvig-ui/button'
import { ThirdLevelHeadline } from 'hedvig-ui/typography'
import React from 'react'
import { Notification } from 'store/actions/notificationsActions'

export const CreateQuoteFromAgreement: React.FunctionComponent<{
  agreement: GenericAgreement
  contract: Contract
  showNotification: (data: Notification) => void
}> = ({ agreement, contract, showNotification }) => {
  const [createQuote] = useCreateQuoteFromAgreement()
  const [quotes, loadingQuotes] = useQuotes(contract.holderMemberId)

  return (
    <>
      <ThirdLevelHeadline>Create Quote</ThirdLevelHeadline>
      <>
        {quotes
          .filter(
            (quote) =>
              quote.state === QuoteState.Quoted && !expiredPredicate(quote),
          )
          .map((quote) => quote.originatingProductId)
          .includes(agreement.id) && !loadingQuotes ? (
          <>Agreement has an existing quote</>
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
