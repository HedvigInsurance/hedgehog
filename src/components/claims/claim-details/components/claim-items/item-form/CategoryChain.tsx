import { Typography } from '@material-ui/core'
import { ItemCategoryKind } from 'api/generated/graphql'
import React from 'react'
import { ChevronDoubleRight, ChevronRight } from 'react-bootstrap-icons'
import {
  Bold,
  ChevronRightWrapper,
  CurrentChip,
  PreviousChip,
  UpcomingChip,
} from '../styles'
import { SelectedItemCategory } from './CategorySelect'

const getTypeInfoSentence = (remainingTypes: string[]) => {
  if (remainingTypes.length === 0) {
    return <></>
  }

  if (remainingTypes.length === 1) {
    return (
      <>
        which will be able to append
        <Bold>{' ' + remainingTypes[0]}s</Bold>.
      </>
    )
  }

  return (
    <>
      which will be able to append
      <Bold>
        {' ' +
          remainingTypes
            .slice(0, -1)
            .map((type) => ` ${type}s`)
            .join(', ')}
      </Bold>
      {' and '}
      <Bold>{remainingTypes.slice(-1) + 's.'}</Bold>
    </>
  )
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const CategoryChain: React.FC<{
  suggestion: string
  selectedItemCategories: SelectedItemCategory[]
}> = ({ suggestion, selectedItemCategories }) => {
  const excludedTypes = ['family', 'company']
  const availableTypes = Object.keys(ItemCategoryKind).map((kind) =>
    kind.toLowerCase(),
  )
  const selectedTypes = selectedItemCategories.map(({ nextKind }) =>
    nextKind.toLowerCase(),
  )
  const remainingTypes = availableTypes
    .filter((type) => !selectedTypes.includes(type))
    .filter((type) => !excludedTypes.includes(type))

  const currentType = selectedTypes.splice(-1)
  const existsMoreTypes = remainingTypes.length > 0

  return (
    <>
      <Typography align={'center'} style={{ marginTop: '5px' }}>
        You are about to create the {currentType} <Bold>{suggestion}</Bold>
        {!existsMoreTypes && '.'}
      </Typography>
      <Typography align={'center'} style={{ marginTop: '1px' }}>
        {existsMoreTypes && getTypeInfoSentence(remainingTypes)}
      </Typography>
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        {selectedItemCategories?.map(({ id, displayName }) => {
          return (
            <React.Fragment key={id}>
              <PreviousChip variant="outlined" label={displayName} />
              <ChevronRightWrapper>
                <ChevronRight />
              </ChevronRightWrapper>
            </React.Fragment>
          )
        })}
        <CurrentChip variant="outlined" color="primary" label={suggestion} />
        {remainingTypes.map((type) => {
          return (
            <React.Fragment key={type}>
              <ChevronRightWrapper>
                <ChevronDoubleRight />
              </ChevronRightWrapper>
              <UpcomingChip variant="outlined" label={capitalize(type) + 's'} />
            </React.Fragment>
          )
        })}
      </div>
    </>
  )
}
