import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core'
import { AccountEntryTable } from 'components/member/tabs/account-tab/AccountEntryTable'
import { AddEntryForm } from 'components/member/tabs/account-tab/AddEntryForm'
import { BackfillSubscriptionsButton } from 'components/member/tabs/account-tab/BackfillSubscriptionsButton'
import {
  InfoContainer,
  InfoRow,
  InfoText,
} from 'components/member/tabs/shared/card-components'
import { Headline } from 'components/member/tabs/shared/headline'
import { useGetAccount } from 'graphql/use-get-account'
import { Card, CardsWrapper } from 'hedvig-ui/card'
import { Spacing } from 'hedvig-ui/spacing'
import { Placeholder, ThirdLevelHeadline } from 'hedvig-ui/typography'
import React from 'react'
import { ArrowRepeat, ChevronDown } from 'react-bootstrap-icons'
import { formatMoney } from 'utils/money'
import { RefreshButton } from '../shared/refresh-button'

const moneyOptions = {
  minimumFractionDigits: 2,
  useGrouping: true,
}

export const AccountTab: React.FC<{
  memberId: string
}> = ({ memberId }) => {
  const [account, { loading, refetch, error }] = useGetAccount(memberId)

  if (loading) {
    return (
      <>
        <Headline>
          Account
          <RefreshButton onClick={() => refetch()} loading={loading}>
            <ArrowRepeat />
          </RefreshButton>
        </Headline>
        Loading...
      </>
    )
  }
  if (error || !account) {
    return (
      <>
        <Headline>
          Account
          <RefreshButton onClick={() => refetch()} loading={loading}>
            <ArrowRepeat />
          </RefreshButton>
        </Headline>
        No account found :(
      </>
    )
  }
  return (
    <>
      <Headline>
        Account
        <RefreshButton onClick={() => refetch()} loading={loading}>
          <ArrowRepeat />
        </RefreshButton>
      </Headline>
      <CardsWrapper>
        <Card span={2}>
          <InfoContainer>
            <InfoRow>
              <ThirdLevelHeadline>Balance</ThirdLevelHeadline>
            </InfoRow>
            <Spacing top={'small'} />
            <InfoRow>
              Current Month
              <InfoText>
                {formatMoney(account?.currentBalance, moneyOptions)}
              </InfoText>
            </InfoRow>
            <Spacing top={'small'} />
            <InfoRow>
              Total
              <InfoText>
                {formatMoney(account?.totalBalance, moneyOptions)}
              </InfoText>
            </InfoRow>
          </InfoContainer>
        </Card>
        <Card span={2}>
          <InfoContainer>
            <InfoRow>
              <ThirdLevelHeadline>
                Upcoming Charge Information
              </ThirdLevelHeadline>
            </InfoRow>
            <Spacing top={'small'} />
            <InfoRow>
              Total Discount Amount
              <InfoText>
                {formatMoney(account?.currentBalance, moneyOptions)}
              </InfoText>
            </InfoRow>
            <InfoRow>
              Subscription Charge
              <InfoText>
                {formatMoney(
                  account?.chargeEstimation.subscription,
                  moneyOptions,
                )}
              </InfoText>
            </InfoRow>
            <Spacing top={'small'} />
            <InfoRow>
              Discount References
              <InfoText>
                {account?.chargeEstimation?.discountCodes.length === 0 ? (
                  <Placeholder>None</Placeholder>
                ) : (
                  account?.chargeEstimation?.discountCodes
                )}
              </InfoText>
            </InfoRow>
            <Spacing top={'small'} />
            <InfoRow>
              Net Charge Next Month
              <InfoText>
                {formatMoney(account?.chargeEstimation?.charge, moneyOptions)}
              </InfoText>
            </InfoRow>
          </InfoContainer>
        </Card>
        <Card span={1} style={{ padding: '0.2rem' }}>
          <ExpansionPanel style={{ width: '100%' }}>
            <ExpansionPanelSummary expandIcon={<ChevronDown />}>
              Add entry
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <AddEntryForm memberId={memberId} />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Card>
      </CardsWrapper>
      <AccountEntryTable accountEntries={account.entries} />
      <BackfillSubscriptionsButton memberId={memberId} />
    </>
  )
}
