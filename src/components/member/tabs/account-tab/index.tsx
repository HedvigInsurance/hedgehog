import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core'
import { ExpandMoreOutlined } from '@material-ui/icons'
import { AccountEntryTable } from 'components/member/tabs/account-tab/AccountEntryTable'
import { AddEntryForm } from 'components/member/tabs/account-tab/AddEntryForm'
import { BackfillSubscriptionsButton } from 'components/member/tabs/account-tab/BackfillSubscriptionsButton'
import {
  InfoContainer,
  InfoRow,
  InfoText,
} from 'components/member/tabs/shared/card-components'
import { Placeholder } from 'components/member/tabs/shared/placeholder'
import { useGetAccount } from 'graphql/use-get-account'
import { Card, CardsWrapper } from 'hedvig-ui/card'
import { Spacing } from 'hedvig-ui/spacing'
import { MainHeadline, ThirdLevelHeadline } from 'hedvig-ui/typography'
import React from 'react'
import { ArrowRepeat } from 'react-bootstrap-icons'
import styled, { css, keyframes } from 'react-emotion'
import { formatMoney } from 'utils/money'

const moneyOptions = {
  minimumFractionDigits: 2,
  useGrouping: true,
}

const Headline = styled(MainHeadline)`
  display: flex;
  align-items: center;
`

const spin = keyframes`
  from{transform: rotate(0deg)}
  to{transform: rotate(360deg)}
`
const RefreshButton = styled.button<{ loading: boolean }>`
  background: transparent;
  font-size: 0.875em;
  color: ${({ theme }) => theme.mutedText};
  padding: 0;
  border: 0;
  margin-left: 1rem;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: transform 500ms;
  ${({ loading }) =>
    loading &&
    css`
      animation: ${spin} 500ms linear infinite;
    `};
`

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
            <ExpansionPanelSummary expandIcon={<ExpandMoreOutlined />}>
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
