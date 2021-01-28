import { ClaimsList } from 'components/claims'
import { ListPage } from 'components/shared'
import React from 'react'

export const ClaimsPage = (props) => (
  <ListPage>
    <ClaimsList {...props} />
  </ListPage>
)
