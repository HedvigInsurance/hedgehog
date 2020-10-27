import { ContractMarketInfo } from 'api/generated/graphql'
import { CampaignsInfo } from 'components/member/tabs/campaigns-tab/campaigns/CampaignsInfo'
import { ReferralsInfo } from 'components/member/tabs/campaigns-tab/referrals/ReferralsInfo'
import { Headline } from 'components/member/tabs/shared/headline'
import { RefreshButton } from 'components/member/tabs/shared/refresh-button'
import { useGetReferralInformation } from 'graphql/use-get-referral-information'
import { FadeIn } from 'hedvig-ui/animations/fade-in'
import {
  LoadingMessage,
  StandaloneMessage,
} from 'hedvig-ui/animations/standalone-message'
import React from 'react'
import { ArrowRepeat } from 'react-bootstrap-icons'

export const CampaignsTab: React.FunctionComponent<{
  memberId: string
  contractMarketInfo: ContractMarketInfo
}> = ({ memberId, contractMarketInfo }) => {
  const [
    referralInformation,
    { loading, error, refetch },
  ] = useGetReferralInformation(memberId)

  if (loading) {
    return <LoadingMessage paddingTop="10vh" />
  }

  if (error || !referralInformation) {
    return (
      <StandaloneMessage paddingTop="10vh">
        Something went wrong
      </StandaloneMessage>
    )
  }

  return (
    <FadeIn>
      <Headline>
        Campaigns
        <RefreshButton onClick={() => refetch()} loading={loading}>
          <ArrowRepeat />
        </RefreshButton>
      </Headline>
      <CampaignsInfo
        memberId={memberId}
        referralInformation={referralInformation}
      />

      <Headline>Referrals</Headline>
      <ReferralsInfo
        memberId={memberId}
        referralInformation={referralInformation}
        market={contractMarketInfo?.market}
      />
    </FadeIn>
  )
}
