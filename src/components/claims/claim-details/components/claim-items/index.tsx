import { Contract } from 'api/generated/graphql'
import { Paper } from 'components/shared/Paper'
import { Spacing } from 'hedvig-ui/spacing'
import React from 'react'
import { ItemForm } from './components/ItemForm'
import { ItemList } from './components/ItemList'

export const ClaimItems: React.FC<{
  claimId: string
  memberId: string | null
  contract?: Contract | null
}> = ({ claimId, memberId, contract }) => {
  return (
    <Paper>
      <div>
        <h3>Inventory</h3>
      </div>
      <ItemList claimId={claimId} />
      <Spacing top={'small'} />
      <ItemForm claimId={claimId} memberId={memberId} contract={contract} />
    </Paper>
  )
}
