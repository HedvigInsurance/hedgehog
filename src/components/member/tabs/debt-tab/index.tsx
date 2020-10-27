import {
  ContractMarketInfo,
  Market,
  PaymentDefault,
} from 'api/generated/graphql'
import { OverallDebtProfile } from 'components/member/tabs/debt-tab/OverallDebtProfile'
import { PaymentDefaultsTable } from 'components/member/tabs/debt-tab/PaymentDefaultsTable'
import { WhitelistMemberButton } from 'components/member/tabs/debt-tab/WhitelistMemberButton'
import {
  InfoContainer,
  InfoRow,
  InfoText,
} from 'components/member/tabs/shared/card-components'
import { Headline } from 'components/member/tabs/shared/headline'
import { RefreshButton } from 'components/member/tabs/shared/refresh-button'
import { useGetPerson } from 'graphql/use-get-person'
import { FadeIn } from 'hedvig-ui/animations/fade-in'
import {
  LoadingMessage,
  StandaloneMessage,
} from 'hedvig-ui/animations/standalone-message'
import { Card, CardsWrapper } from 'hedvig-ui/card'
import { FlagOrbIndicator } from 'hedvig-ui/orb-indicator'
import { Spacing } from 'hedvig-ui/spacing'
import React from 'react'
import { ArrowRepeat } from 'react-bootstrap-icons'

export const DebtTab: React.FC<{
  memberId: string
  contractMarketInfo: ContractMarketInfo
}> = ({ memberId, contractMarketInfo }) => {
  const [person, { loading, error, refetch }] = useGetPerson(memberId)

  const eligibleForWhitelist =
    !person?.status?.whitelisted && person?.debt?.paymentDefaults?.length !== 0

  // FIXME: We should not make market specific features like this, should use "have debt" or "don't have debt" instead
  if (contractMarketInfo?.market === Market.Norway) {
    return (
      <StandaloneMessage paddingTop="10vh">
        Not available for Norway
      </StandaloneMessage>
    )
  }

  if (loading) {
    return <LoadingMessage paddingTop="10vh" />
  }

  if (error || !person) {
    return (
      <StandaloneMessage paddingTop="10vh">
        Issue retrieving debt for this member
      </StandaloneMessage>
    )
  }

  return (
    <FadeIn>
      <Headline>
        Debt
        <RefreshButton onClick={() => refetch()} loading={loading}>
          <ArrowRepeat />
        </RefreshButton>
      </Headline>
      <CardsWrapper>
        <Card span={2}>
          <InfoContainer>
            <InfoRow>
              Member flag
              <InfoText>
                {person?.status?.flag && (
                  <FlagOrbIndicator flag={person.status.flag} size={'tiny'} />
                )}
              </InfoText>
            </InfoRow>
            <InfoRow>
              Member status
              <InfoText>
                {person?.status?.whitelisted
                  ? 'Whitelisted'
                  : 'Not Whitelisted'}
              </InfoText>
            </InfoRow>
          </InfoContainer>
          <Spacing top={'large'} />
          {eligibleForWhitelist && (
            <WhitelistMemberButton memberId={memberId} />
          )}
        </Card>
        {person?.debt && <OverallDebtProfile debt={person.debt} />}
      </CardsWrapper>
      {person?.debt?.paymentDefaults && (
        <PaymentDefaultsTable
          paymentDefaults={person.debt.paymentDefaults as PaymentDefault[]}
        />
      )}
    </FadeIn>
  )
}
