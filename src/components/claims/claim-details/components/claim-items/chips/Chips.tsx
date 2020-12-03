import { useCanValuateClaimItem } from 'graphql/use-can-valuate-claim-item'
import { UpsertClaimItemVariables } from 'graphql/use-upsert-claim-item'
import React from 'react'
import { NoValuationChip } from './components/NoValuationChip'
import { CustomValuationChip } from './CustomValuationChip'
import { MessageChip } from './MessageChip'

export const Chips: React.FC<{
  typeOfContract: string
  formData: UpsertClaimItemVariables
  setFormData: (formData: UpsertClaimItemVariables) => void
}> = ({ typeOfContract, formData, setFormData }) => {
  const { itemFamilyId, itemTypeId } = formData

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
