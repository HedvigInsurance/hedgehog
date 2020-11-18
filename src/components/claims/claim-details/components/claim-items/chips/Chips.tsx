import { TypeOfContract } from 'api/generated/graphql'
import { NoValuationChip } from 'components/claims/claim-details/components/claim-items/chips/components/NoValuationChip'
import { MessageChip } from 'components/claims/claim-details/components/claim-items/chips/MessageChip'
import { useCanValuateClaimItem } from 'graphql/use-can-valuate-claim-item'
import { UpsertClaimItemVariables } from 'graphql/use-upsert-claim-item'
import React from 'react'
import { CustomValuationChip } from './CustomValuationChip'

export const Chips: React.FC<{
  typeOfContract: TypeOfContract
  formData: UpsertClaimItemVariables
  setFormData: (formData: UpsertClaimItemVariables) => void
}> = ({ typeOfContract, formData, setFormData }) => {
  const { itemFamilyId, itemTypeId } = { ...formData }

  const [canValuate, { loading }] = useCanValuateClaimItem(
    itemFamilyId,
    itemTypeId,
    typeOfContract,
  )

  React.useEffect(() => {
    setFormData({ ...formData, customValuationAmount: '' })
  }, [itemFamilyId, itemTypeId])

  if (loading || !itemFamilyId || !typeOfContract) {
    return <></>
  }

  return (
    <>
      {canValuate ? (
        <MessageChip
          onValuation={({ depreciatedValue }) =>
            setFormData({
              ...formData,
              automaticValuationAmount: depreciatedValue?.amount,
            })
          }
          typeOfContract={typeOfContract}
          formData={formData}
        />
      ) : (
        <NoValuationChip />
      )}
      <CustomValuationChip
        formData={formData}
        onChange={(amount) =>
          setFormData({ ...formData, customValuationAmount: amount })
        }
        onReset={() => {
          setFormData({ ...formData, customValuationAmount: '' })
        }}
      />
    </>
  )
}