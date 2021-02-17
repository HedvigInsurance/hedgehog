import { Claim, Contract } from 'api/generated/graphql'
import { InventoryProvider } from 'components/claims/claim-details/components/claim-items/context'
import { ItemForm } from 'components/claims/claim-details/components/claim-items/item-form/ItemForm'
import { Paper } from 'components/shared/Paper'
import { useContractMarketInfo } from 'graphql/use-get-member-contract-market-info'
import { StandaloneMessage } from 'hedvig-ui/animations/standalone-message'
import { Button } from 'hedvig-ui/button'
import React from 'react'
import styled from 'react-emotion'

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const Header = styled.div`
  display: flex;
  flex: 1;
`

const Content = styled.div`
  display: flex;
  flex: 4;
  justify-content: center;
  align-items: center;
`

const Footer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`

export const ClaimItems: React.FC<{
  claim: Claim
  memberId: string
  contract: Contract | null
}> = ({ claim, memberId, contract }) => {
  const [contractMarketInfo] = useContractMarketInfo(memberId)
  const [showForm, setShowForm] = React.useState(false)

  const claimId = claim?.id
  const typeOfContract = contract?.typeOfContract
  const preferredCurrency = contractMarketInfo?.preferredCurrency

  if (!claimId || !typeOfContract) {
    return null
  }

  return (
    <Paper>
      <Container>
        <Header>
          <h3>Inventory</h3>
        </Header>
        <Content>
          <InventoryProvider
            state={{ claimId, typeOfContract, preferredCurrency }}
          >
            {showForm ? (
              <ItemForm />
            ) : (
              <StandaloneMessage style={{ fontSize: '1.25rem' }}>
                No items added
              </StandaloneMessage>
            )}
          </InventoryProvider>
        </Content>
        <Footer>
          <Button
            style={{ width: '20%' }}
            variation={'primary'}
            onClick={() => setShowForm(true)}
          >
            ADD ITEM
          </Button>
        </Footer>
      </Container>
    </Paper>
  )
}
