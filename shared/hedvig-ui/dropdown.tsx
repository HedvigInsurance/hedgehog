import React from 'react'
import styled from 'react-emotion'
import { Dropdown, DropdownItemProps } from 'semantic-ui-react'

const StyledDropdown = styled(Dropdown)({
  width: '100%',
})

export const EnumDropdown: React.FunctionComponent<{
  enumToSelectFrom: any
  placeholder: string
  setValue: (value: any) => void
}> = ({ enumToSelectFrom, placeholder, setValue }) => {
  const dropdownOptions: DropdownItemProps[] = Object.values(
    enumToSelectFrom,
  ).map((value, index) => {
    if (typeof value === 'number') {
      throw new Error(
        `EnumDropdown does not support enums with ordinal values (yet), enumToSelectFrom: ${JSON.stringify(
          enumToSelectFrom,
        )}`,
      )
    }
    return {
      key: index + 1,
      value: value as string,
      text: getTextFromEnumValue(value as string),
    }
  })

  return (
    <StyledDropdown
      placeholder={placeholder}
      options={dropdownOptions}
      selection
      onChange={(_, { value }) => setValue(value)}
    />
  )
}

export const getTextFromEnumValue = (sentence: string) => {
  return sentence
    .toLowerCase()
    .split('_')
    .map((word, index) => {
      if (index === 0 || word === 'hedvig') {
        return word.charAt(0).toUpperCase() + word.slice(1)
      }
      return word
    })
    .join(' ')
}
