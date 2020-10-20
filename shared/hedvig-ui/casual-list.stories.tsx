import { CasualList, CasualListItem } from 'hedvig-ui/casual-list'
import React from 'react'

export const DefaultCasualList = () => {
  return (
    <CasualList>
      <CasualListItem>First item</CasualListItem>
      <CasualListItem>Second item</CasualListItem>
      <CasualListItem>Third item</CasualListItem>
    </CasualList>
  )
}

export default {
  title: 'CasualList',
  component: CasualList,
}
