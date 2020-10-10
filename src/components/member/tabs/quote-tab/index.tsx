import { Quote } from 'api/generated/graphql'
import { useContractMarketInfo } from 'graphql/use-get-member-contract-market-info'
import { useQuotes } from 'graphql/use-get-quotes'
import { getTextFromEnumValue } from 'hedvig-ui/dropdown'
import * as React from 'react'
import { Tab } from 'semantic-ui-react'
import {
  ContractType,
  isNorwegianMarket,
  isSwedishMarket,
} from 'utils/contract'
import { QuotesSubSection } from './quote-sub-section'

export const Quotes: React.FunctionComponent<{ memberId: string }> = ({
  memberId,
}) => {
  const [quotes, { loading: quotesLoading }] = useQuotes(memberId)
  const [contractMarket, { loading }] = useContractMarketInfo(memberId)

  if (loading || quotesLoading) {
    return null
  }

  if (quotes.length === 0) {
    return <em>No quotes :(</em>
  }

  if (!contractMarket) {
    return <>Unable to get Market, please contact Tech</>
  }

  const getUniqueContractTypes = () => {
    if (isSwedishMarket(contractMarket)) {
      return [ContractType.SwedishApartment, ContractType.SwedishHouse]
    }

    if (isNorwegianMarket(contractMarket)) {
      return [ContractType.NorwegianHomeContent, ContractType.NorwegianTravel]
    }

    return []
  }

  const shouldShowInContractTypeSubSection = (
    quote: Quote,
    contractType,
  ): boolean => {
    if (quote.productType === 'HOME_CONTENT') {
      return contractType === ContractType.NorwegianHomeContent
    }
    if (quote.productType === 'TRAVEL') {
      return contractType === ContractType.NorwegianTravel
    }
    if (quote.productType === 'APARTMENT') {
      return contractType === ContractType.SwedishApartment
    }
    if (quote.productType === 'HOUSE') {
      return contractType === ContractType.SwedishHouse
    }
    return false
  }

  const getCategorisedQuotesBasedOnContractType = (
    contractType: string,
  ): Quote[] => {
    return quotes.filter((quote) =>
      shouldShowInContractTypeSubSection(quote, contractType),
    )
  }

  const getTabs = () =>
    getUniqueContractTypes().map((contractType) => ({
      menuItem: getTextFromEnumValue(contractType),
      render: () => (
        <Tab.Pane>
          <QuotesSubSection
            memberId={memberId}
            contractType={contractType}
            quotes={getCategorisedQuotesBasedOnContractType(contractType)}
          />
        </Tab.Pane>
      ),
    }))
  return <Tab panes={getTabs()} />
}
