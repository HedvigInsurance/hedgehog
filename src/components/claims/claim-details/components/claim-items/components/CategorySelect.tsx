import { ItemCategoryKind } from 'api/generated/graphql'
import { useGetItemCategories } from 'graphql/use-get-item-categories'
import { Placeholder } from 'hedvig-ui/typography'
import React from 'react'
import { components } from 'react-select'
import { CategoryDialog } from './CategoryDialog'
import { StyledCreatableSelect } from './styles'

const SelectItemCategoriesPlaceholder = (props) => {
  const [selectedOptions, rawInput] = props.children
  const showPlaceholder =
    !props.selectProps.menuIsOpen || rawInput.props.value === ''

  return (
    <components.ValueContainer {...props}>
      {selectedOptions}
      {rawInput}
      {showPlaceholder && (
        <Placeholder>{props.selectProps.placeholder}</Placeholder>
      )}
    </components.ValueContainer>
  )
}

const customFilter = (option, inputValue) => {
  const words = inputValue.split(' ')
  return words.reduce((acc, cur) => {
    return (
      acc &&
      (option.data?.searchTerms?.toLowerCase().includes(cur.toLowerCase()) ??
        true)
    )
  }, true)
}

const noOptionsMessage = (
  currentItemCategory: SelectedItemCategory | undefined,
  noMoreItemCategories: boolean,
) => {
  const nextKind = currentItemCategory?.nextKind?.toLowerCase()
  return (
    <>
      {nextKind
        ? `No ${nextKind}s`
        : noMoreItemCategories
        ? 'No more categories available'
        : 'No result'}
    </>
  )
}

export interface SelectedItemCategory {
  nextKind: ItemCategoryKind
  id: string
  parentId: string | null
  displayName: string
}

export const CategorySelect: React.FC<{
  selectedItemCategories: SelectedItemCategory[]
  setSelectedItemCategories: React.Dispatch<
    React.SetStateAction<SelectedItemCategory[]>
  >
}> = ({ selectedItemCategories, setSelectedItemCategories }) => {
  const [dialogIsOpen, setDialogIsOpen] = React.useState<boolean>(false)
  const [creatableInput, setCreatableInput] = React.useState<string>('')
  const currentItemCategory = selectedItemCategories?.slice(-1).pop()
  const [
    newItemCategories,
    { loading: loadingNewItemCategories },
  ] = useGetItemCategories(
    currentItemCategory?.nextKind ?? ItemCategoryKind.Family,
    currentItemCategory?.id ?? null,
  )
  const placeholderSuggestion =
    newItemCategories
      .slice(0, 2)
      .map((itemCategory) => `${itemCategory.displayName}`)
      .join(', ') + '...'

  const noMoreItemCategories =
    !currentItemCategory?.nextKind && selectedItemCategories.length !== 0
  const noSelectedCategories = selectedItemCategories.length === 0
  const noNewItemCategories = newItemCategories.length === 0

  return (
    <>
      {dialogIsOpen && (
        <CategoryDialog
          setDialogIsOpen={setDialogIsOpen}
          suggestion={creatableInput}
          selectedItemCategories={selectedItemCategories}
        />
      )}
      <StyledCreatableSelect
        classNamePrefix="custom-select"
        tabSelectsValue={false}
        closeMenuOnSelect={false}
        isMulti
        placeholder={
          noMoreItemCategories || noNewItemCategories
            ? null
            : placeholderSuggestion
        }
        components={{ ValueContainer: SelectItemCategoriesPlaceholder }}
        filterOption={customFilter}
        onCreateOption={(suggestion) => {
          setCreatableInput(suggestion)
          setDialogIsOpen(true)
        }}
        noOptionsMessage={() =>
          noOptionsMessage(currentItemCategory, noMoreItemCategories)
        }
        isValidNewOption={(inputValue, _selectValue, selectOptions) => {
          const optionAlreadyExists = selectOptions.find(
            (option) => option.label.toLowerCase() === inputValue.toLowerCase(),
          )

          return !(
            noMoreItemCategories ||
            noSelectedCategories ||
            optionAlreadyExists ||
            inputValue === ''
          )
        }}
        value={selectedItemCategories?.map((itemCategory) => {
          return {
            ...itemCategory,
            value: itemCategory?.id,
            label: itemCategory?.displayName,
          }
        })}
        onChange={(selections: any[]) => {
          setSelectedItemCategories(
            selections?.map(({ nextKind, id, parentId, displayName }) => {
              return { nextKind, id, parentId, displayName }
            }) ?? [],
          )
        }}
        options={
          loadingNewItemCategories || noMoreItemCategories
            ? []
            : newItemCategories.map((newItemCategory) => {
                return {
                  ...newItemCategory,
                  value: newItemCategory?.id,
                  label: newItemCategory?.displayName,
                  searchTerms: newItemCategory?.searchTerms,
                }
              })
        }
      />
    </>
  )
}
