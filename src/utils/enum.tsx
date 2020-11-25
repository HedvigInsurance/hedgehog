import { getTextFromEnumValue } from 'hedvig-ui/dropdown'
import { DropdownItemProps } from 'semantic-ui-react'

export const enumToDropdownOptions = (inputEnum: any): DropdownItemProps[] => {
  return Object.values(inputEnum).map((value) => {
    return {
      key: value,
      value: value as string,
      text: getTextFromEnumValue(value as string),
    }
  })
}
