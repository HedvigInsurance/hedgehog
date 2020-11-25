import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core'
import { ContractMarketInfo } from 'api/generated/graphql'
import { AccountEntriesInfo } from 'components/member/tabs/account-tab/AccountEntriesInfo'
import { AccountEntryTable } from 'components/member/tabs/account-tab/AccountEntryTable'
import { AddEntryForm } from 'components/member/tabs/account-tab/AddEntryForm'
import { AddMonthlyEntryForm } from 'components/member/tabs/account-tab/AddMonthlyEntryForm'
import { BackfillSubscriptionsButton } from 'components/member/tabs/account-tab/BackfillSubscriptionsButton'
import { MonthlyEntriesInfo } from 'components/member/tabs/account-tab/MonthlyEntriesInfo'
import { MonthlyEntriesTable } from 'components/member/tabs/account-tab/MonthlyEntriesTable'
import {
  InfoContainer,
  InfoRow,
  InfoText,
} from 'components/member/tabs/shared/card-components'
import { useGetAccount } from 'graphql/use-get-account'
import { FadeIn } from 'hedvig-ui/animations/fade-in'
import {
  LoadingMessage,
  StandaloneMessage,
} from 'hedvig-ui/animations/standalone-message'
import { Card, CardsWrapper } from 'hedvig-ui/card'
import { Spacing } from 'hedvig-ui/spacing'
import { MainHeadline, ThirdLevelHeadline } from 'hedvig-ui/typography'
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
  contractMarketInfo: ContractMarketInfo
}> = ({ memberId, contractMarketInfo }) => {
  const [account, { loading, refetch, error }] = useGetAccount(memberId)

  if (loading) {
    return <LoadingMessage paddingTop="10vh" />
  }
  if (error || !account) {
    return (
      <StandaloneMessage paddingTop="10vh">No account found</StandaloneMessage>
    )
  }

  console.log(contractMarketInfo)
  return (
    <FadeIn>
      <MainHeadline>
        Account
        <RefreshButton onClick={() => refetch()} loading={loading}>
          <ArrowRepeat />
        </RefreshButton>
      </MainHeadline>
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
              Current Balance
              <InfoText>
                {formatMoney(account?.currentBalance, moneyOptions)}
              </InfoText>
            </InfoRow>
            <InfoRow>
              Upcoming Subscription
              <InfoText>
                +{' '}
                {formatMoney(
                  account?.chargeEstimation.subscription,
                  moneyOptions,
                )}
              </InfoText>
            </InfoRow>
            {+account?.chargeEstimation.discount.amount > 0 && (
              <InfoRow>
                Upcoming Discount
                <InfoText>
                  -{' '}
                  {formatMoney(
                    account?.chargeEstimation.discount,
                    moneyOptions,
                  )}
                </InfoText>
              </InfoRow>
            )}
            <Spacing top={'small'} />
            {account?.chargeEstimation?.discountCodes.length > 0 && (
              <InfoRow>
                Discount References
                <InfoText>
                  {account?.chargeEstimation?.discountCodes.join(', ')}
                </InfoText>
              </InfoRow>
            )}
            <Spacing top={'small'} />
            <InfoRow>
              Upcoming Charge
              <InfoText>
                = {formatMoney(account?.chargeEstimation?.charge, moneyOptions)}
              </InfoText>
            </InfoRow>
          </InfoContainer>
        </Card>
      </CardsWrapper>
      <AccountEntriesInfo />
      <Spacing top bottom>
        <CardsWrapper>
          <Card padding="small">
            <ExpansionPanel style={{ width: '100%' }}>
              <ExpansionPanelSummary expandIcon={<ChevronDown />}>
                Add entry to account
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <AddEntryForm memberId={memberId} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Card>
        </CardsWrapper>
        <AccountEntryTable accountEntries={account.entries} />
      </Spacing>

      <div>
        <BackfillSubscriptionsButton memberId={memberId} />
      </div>
      <MonthlyEntriesInfo />
      <Spacing top bottom>
        <CardsWrapper>
          <Card padding="small">
            <ExpansionPanel style={{ width: '100%' }}>
              <ExpansionPanelSummary expandIcon={<ChevronDown />}>
                Add monthly entry
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <AddMonthlyEntryForm
                  memberId={memberId}
                  preferredCurrency={contractMarketInfo?.preferredCurrency}
                />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </Card>
        </CardsWrapper>
        <MonthlyEntriesTable
          memberId={memberId}
          monthlyEntries={account.monthlyEntries}
        />
      </Spacing>
    </FadeIn>
  )
}
