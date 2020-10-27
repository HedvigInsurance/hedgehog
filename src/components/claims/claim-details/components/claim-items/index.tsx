import { Contract } from 'api/generated/graphql'
import { Paper } from 'components/shared/Paper'
import { useGetClaimItems } from 'graphql/use-get-claim-items'
import { useContractMarketInfo } from 'graphql/use-get-member-contract-market-info'
import { Spacing } from 'hedvig-ui/spacing'
import React from 'react'
import { ItemForm } from './components/ItemForm'
import { ItemList } from './components/ItemList'

export const ClaimItems: React.FC<{
  claimId: string
  memberId: string
  contract?: Contract | null
}> = ({ claimId, memberId, contract }) => {
  const [claimItems] = useGetClaimItems(claimId)
  const [contractMarketInfo] = useContractMarketInfo(memberId)

  const { preferredCurrency = 'SEK' } = { ...contractMarketInfo }

  return (
    <Paper>
      <div>
        <h3>Inventory</h3>
      </div>
      <ItemList claimItems={claimItems} />
      <Spacing top={'small'} />
      <ItemForm
        claimId={claimId}
        preferredCurrency={preferredCurrency}
        contract={contract}
      />
    </Paper>
  )
}
