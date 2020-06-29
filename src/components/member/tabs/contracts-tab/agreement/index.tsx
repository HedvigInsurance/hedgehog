import {
  Agreement as AgreementType,
  AgreementStatus,
  Contract,
} from 'api/generated/graphql'
import { AgreementInfo } from 'components/member/tabs/contracts-tab/agreement/AgreementInfo'
import { FromDate } from 'components/member/tabs/contracts-tab/agreement/FromDate'
import { InsuranceCertificate } from 'components/member/tabs/contracts-tab/agreement/InsuranceCertificate'
import { InsuranceMandate } from 'components/member/tabs/contracts-tab/agreement/InsuranceMandate'
import { ToDate } from 'components/member/tabs/contracts-tab/agreement/ToDate'
import { Card, CardsWrapper } from 'hedvig-ui/card'
import { ThirdLevelHeadline } from 'hedvig-ui/typography'
import React from 'react'
import styled from 'react-emotion'
import { WithShowNotification } from 'store/actions/notificationsActions'
import { withShowNotification } from 'utils/notifications'
import { InfoRow, InfoText } from '../contract'
import { CreateQuoteFromAgreement } from './CreateQuoteFromAgreement'

const Divider = styled('hr')`
  background: transparent;
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.borderStrong};
  margin: 2rem 0;
  height: 0;
  width: 100%;
`

const AgreementComponent: React.FC<{
  agreement: AgreementType
  contract: Contract
  refetch: () => Promise<void>
} & WithShowNotification> = ({
  agreement,
  contract,
  showNotification,
  refetch,
}) => {
  return (
    <>
      <CardsWrapper>
        <Card span={2}>
          <AgreementInfo agreement={agreement} />
        </Card>
        {agreement.status !== AgreementStatus.Pending && (
          <>
            <Card span={2}>
              <FromDate
                agreement={agreement}
                contract={contract}
                showNotification={showNotification}
              />
              <Divider />
              <div>
                <ToDate
                  agreement={agreement}
                  contract={contract}
                  showNotification={showNotification}
                />
              </div>
            </Card>
            <Card span={2}>
              <InsuranceCertificate
                contract={contract}
                agreement={agreement}
                showNotification={showNotification}
                refetch={refetch}
              />
            </Card>
          </>
        )}
        <Card span={2}>
          <CreateQuoteFromAgreement
            agreement={agreement}
            contract={contract}
            showNotification={showNotification}
          />
        </Card>

        <Card span={2}>
          <InsuranceMandate contract={contract} />
        </Card>

        <Card span={2}>
          <ThirdLevelHeadline>Debuging</ThirdLevelHeadline>
          <InfoRow>
            Contract id
            <InfoText>{contract.id}</InfoText>
          </InfoRow>
          <InfoRow>
            Member id <InfoText>{contract.holderMemberId}</InfoText>
          </InfoRow>
          <InfoRow>
            Agreement id <InfoText>{agreement.id}</InfoText>
          </InfoRow>
        </Card>
      </CardsWrapper>
    </>
  )
}

export const Agreement = withShowNotification(AgreementComponent)
