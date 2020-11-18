import {
  useInsertItemCategoriesMutation,
  useInsertValuationRulesMutation,
  useRemoveItemCategoryMutation,
} from 'api/generated/graphql'
import {
  CategorySelect,
  SelectedItemCategory,
} from 'components/claims/claim-details/components/claim-items/item-form/CategorySelect'
import { Button } from 'hedvig-ui/button'
import { Spacing } from 'hedvig-ui/spacing'
import { MainHeadline, ThirdLevelHeadline } from 'hedvig-ui/typography'
import React from 'react'
import { TableInput } from './TableInput'

export const ItemizerComponent: React.FC = () => {
  const [insertItemCategories] = useInsertItemCategoriesMutation()
  const [insertValuationRules] = useInsertValuationRulesMutation()
  const [
    removeItemCategory,
    { loading: removeItemCategoryLoading },
  ] = useRemoveItemCategoryMutation()

  const [selectedItemCategories, setSelectedItemCategories] = React.useState<
    SelectedItemCategory[]
  >([])

  const canDeleteItemCategory = selectedItemCategories.length > 1
  const latestItemCategory = selectedItemCategories.slice(-1)[0]

  return (
    <>
      <MainHeadline>Itemizer</MainHeadline>
      <TableInput
        title="Valuation rules"
        headers={[
          'Name',
          'Age',
          'Type of Contract',
          'Item Family',
          'Item Type',
          'Valuation Type',
          'Depreciation',
        ]}
        onSubmit={(data, setValidity, setResetRequired) =>
          insertValuationRules({
            variables: { request: { valuationRulesString: data } },
          }).then(({ data: response }) => {
            setResetRequired(true)
            setValidity(response?.insertValuationRules ?? [])
          })
        }
      />
      <TableInput
        title="Item categories"
        headers={['Family', 'Type', 'Company', 'Brand', 'Model']}
        onSubmit={(data, setValidity, setResetRequired) =>
          insertItemCategories({
            variables: { request: { itemCategoriesString: data } },
          }).then(({ data: response }) => {
            setResetRequired(true)
            setValidity(response?.insertItemCategories ?? [])
          })
        }
      />
      <ThirdLevelHeadline>Delete item category</ThirdLevelHeadline>
      <CategorySelect
        selectedItemCategories={selectedItemCategories}
        setSelectedItemCategories={setSelectedItemCategories}
      />
      <Spacing top={'small'} />
      <Button
        disabled={!canDeleteItemCategory || removeItemCategoryLoading}
        variation={'primary'}
        onClick={() => {
          if (!canDeleteItemCategory) {
            return
          }

          if (
            !window.confirm(
              `Are you sure you want to delete ${latestItemCategory.displayName}?`,
            )
          ) {
            return
          }

          removeItemCategory({
            variables: { itemCategoryId: latestItemCategory.id },
          }).then(() => {
            setSelectedItemCategories(selectedItemCategories.slice(0, -1))
          })
        }}
      >
        Delete
      </Button>
    </>
  )
}
