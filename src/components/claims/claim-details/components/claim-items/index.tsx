import { Button } from '@material-ui/core'
import { Paper } from 'components/shared/Paper'
import { useGetClaimItems } from 'graphql/use-get-claim-items'
import { useGetClaimValuation } from 'graphql/use-get-claim-valuation'
import { useContractMarketInfo } from 'graphql/use-get-member-contract-market-info'
import {
  UpsertClaimItemVariables,
  useUpsertClaimItem,
} from 'graphql/use-upsert-claim-item'
import { Spacing } from 'hedvig-ui/spacing'
import React from 'react'
import { ItemForm } from './components/ItemForm'
import { ItemList } from './components/ItemList'

export const ClaimItems: React.FC<{
  claimId: string
  memberId: string
}> = ({ claimId, memberId }) => {
  const [claimItems] = useGetClaimItems(claimId)
  const [claimValuation] = useGetClaimValuation(claimId)
  const [contractMarketInfo] = useContractMarketInfo(memberId)
  const [upsertClaimItem, { loading }] = useUpsertClaimItem(claimId)

  const { preferredCurrency = 'SEK' } = { ...contractMarketInfo }
  const { totalValuation, deductible } = { ...claimValuation }

  const [
    upsertRequest,
    setUpsertRequest,
  ] = React.useState<UpsertClaimItemVariables | null>(null)

  return (
    <Paper>
      <div>
        <h3>Inventory</h3>
      </div>
      <ItemList claimItems={claimItems} />
      <Spacing top={'small'} />
      <ItemForm
        preferredCurrency={preferredCurrency}
        onChange={(request) => setUpsertRequest(request)}
      />
      <Button
        disabled={loading || !upsertRequest}
        variant="contained"
        color="primary"
        onClick={() => upsertRequest && upsertClaimItem(upsertRequest)}
      >
        Add item
      </Button>
    </Paper>
  )
}

/*
<ValuationInfo
              request={request}
              setValuation={setAutomaticValuationAmount}
              customValuationAmount={customValuationAmount}
              setCustomValuationAmount={setCustomValuationAmount}
              defaultCurrency={preferredCurrency}
              typeOfContract={contract.typeOfContract}
            />
 */
