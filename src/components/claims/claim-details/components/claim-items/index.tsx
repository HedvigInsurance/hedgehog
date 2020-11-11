import { Button } from '@material-ui/core'
import { Contract } from 'api/generated/graphql'
import { Chips } from 'components/claims/claim-details/components/claim-items/chips/Chips'
import { TotalValuationChip } from 'components/claims/claim-details/components/claim-items/chips/components/TotalValuationChip'
import {
  isEmpty,
  isValidDate,
  isValidNumber,
} from 'components/claims/claim-details/components/claim-items/utils'
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
import styled from 'react-emotion'
import { ItemForm } from './item-form/ItemForm'
import { ItemList } from './item-list/ItemList'

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChipsWrapper = styled.div``

const formLooksGood = (request: UpsertClaimItemVariables) => {
  if (!request) {
    return false
  }

  const {
    itemFamilyId,
    itemTypeId,
    purchasePriceAmount = '',
    dateOfPurchase = '',
    customValuationAmount = '',
  } = request

  if (!itemFamilyId || !itemTypeId) {
    return false
  }

  if (!isEmpty(purchasePriceAmount) && !isValidNumber(purchasePriceAmount)) {
    return false
  }

  if (!isEmpty(dateOfPurchase) && !isValidDate(dateOfPurchase)) {
    return false
  }

  return isEmpty(customValuationAmount) || isValidNumber(customValuationAmount)
}

export const ClaimItems: React.FC<{
  claimId: string
  memberId: string
  contract: Contract | null
}> = ({ claimId, memberId, contract }) => {
  const [claimItems] = useGetClaimItems(claimId)
  const [contractMarketInfo] = useContractMarketInfo(memberId)
  const { typeOfContract } = { ...contract }
  const [claimValuation] = useGetClaimValuation(claimId, typeOfContract)
  const [upsertClaimItem, { loading }] = useUpsertClaimItem(claimId)

  const { preferredCurrency = 'SEK' } = { ...contractMarketInfo }
  const { totalValuation, deductible } = { ...claimValuation }

  const [
    upsertRequest,
    setUpsertRequest,
  ] = React.useState<UpsertClaimItemVariables | null>(null)

  const [resetSwitch, setResetSwitch] = React.useState(false)

  return (
    <Paper>
      <div>
        <h3>Inventory</h3>
      </div>
      <ItemList claimItems={claimItems} />
      <Spacing top={'small'} />
      <ItemForm
        resetSwitch={resetSwitch}
        onReset={() => setResetSwitch(false)}
        preferredCurrency={preferredCurrency}
        onChange={(formData) => setUpsertRequest(formData)}
      />
      <BottomWrapper>
        <ChipsWrapper>
          {typeOfContract && upsertRequest && upsertRequest.itemFamilyId ? (
            <Chips
              typeOfContract={typeOfContract}
              formData={upsertRequest}
              setFormData={setUpsertRequest}
            />
          ) : (
            <TotalValuationChip totalValuation={totalValuation} />
          )}
        </ChipsWrapper>
        <Button
          disabled={loading || !upsertRequest || !formLooksGood}
          variant="contained"
          color="primary"
          onClick={() => {
            if (upsertRequest) {
              upsertClaimItem(upsertRequest)
              setResetSwitch(true)
            }
          }}
        >
          Add item
        </Button>
      </BottomWrapper>
    </Paper>
  )
}
