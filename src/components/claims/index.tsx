import React from 'react'
import { Header } from 'semantic-ui-react'
import BackendServedClaimsList from './claims-list/BackendServedClaimsList'

export const Claims: React.FC = () => {
  return (
    <>
      <Header size="huge">Claims List</Header>
      <BackendServedClaimsList />
    </>
  )
}
