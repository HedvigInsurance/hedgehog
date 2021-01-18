import { Quote } from 'api/generated/graphql'
import { useContractMarketInfo } from 'graphql/use-get-member-contract-market-info'
import { useQuotes } from 'graphql/use-get-quotes'
import { FadeIn } from 'hedvig-ui/animations/fade-in'
import {
  LoadingMessage,
  StandaloneMessage,
} from 'hedvig-ui/animations/standalone-message'
import { getTextFromEnumValue } from 'hedvig-ui/dropdown'
import * as React from 'react'
import { Tab } from 'semantic-ui-react'
import { ContractType, QuoteProductType } from 'types/enums'
import {
  isDanishMarket,
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
    return <LoadingMessage paddingTop="10vh" />
  }

  if (quotes.length === 0) {
    return <StandaloneMessage paddingTop="10vh">No quotes</StandaloneMessage>
  }

  if (!contractMarket) {
    return (
      <StandaloneMessage paddingTop="10vh">
        Unable to get Market, the member most likely does not have a contract
      </StandaloneMessage>
    )
  }

  const getUniqueContractTypes = () => {
    if (isSwedishMarket(contractMarket)) {
      return [ContractType.SwedishApartment, ContractType.SwedishHouse]
    }

    if (isNorwegianMarket(contractMarket)) {
      return [ContractType.NorwegianHomeContent, ContractType.NorwegianTravel]
    }

    if (isDanishMarket(contractMarket)) {
      return [
        ContractType.DanishHomeContent,
        ContractType.DanishTravel,
        ContractType.DanishAccident,
      ]
    }

    return []
  }

  const shouldShowInContractTypeSubSection = (
    quote: Quote,
    contractType,
  ): boolean => {
    if (quote.productType === QuoteProductType.Apartment) {
      return contractType === ContractType.SwedishApartment
    }
    if (quote.productType === QuoteProductType.House) {
      return contractType === ContractType.SwedishHouse
    }
    if (quote.productType === QuoteProductType.HomeContent) {
      return (
        contractType === ContractType.NorwegianHomeContent ||
        contractType === ContractType.DanishHomeContent
      )
    }
    if (quote.productType === QuoteProductType.Travel) {
      return (
        contractType === ContractType.NorwegianTravel ||
        contractType === ContractType.DanishTravel
      )
    }
    if (quote.productType === QuoteProductType.Accident) {
      return contractType === ContractType.DanishAccident
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
          <FadeIn>
            <QuotesSubSection
              memberId={memberId}
              contractType={contractType}
              quotes={getCategorisedQuotesBasedOnContractType(contractType)}
            />
          </FadeIn>
        </Tab.Pane>
      ),
    }))
  return <Tab panes={getTabs()} />
}
