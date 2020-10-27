import { FadeIn } from 'hedvig-ui/animations/fade-in'
import { LoadingMessage } from 'hedvig-ui/animations/standalone-message'
import { Spacing } from 'hedvig-ui/spacing'
import React from 'react'
import { Header } from 'semantic-ui-react'
import { ClaimSearchFilter, ClaimsStore } from 'store/types/claimsTypes'
import BackendServedClaimsList from './claims-list/BackendServedClaimsList'

export interface ClaimsProps {
  claims: ClaimsStore
  claimsRequest: (filter: ClaimSearchFilter) => void
}

const Claims: React.FC<ClaimsProps> = (props) => {
  const { claimsRequest, claims } = props

  const initClaims = () => claimsRequest(claims.searchFilter)

  React.useEffect(() => {
    initClaims()
  }, [])

  if (claims.searchResult.claims.length === 0) {
    return <LoadingMessage paddingTop={'25vh'} />
  }

  return (
    <>
      <FadeIn>
        <Header size="huge">Claims List</Header>
      </FadeIn>
      <Spacing top={'small'}>
        <FadeIn delay={'200ms'}>
          <BackendServedClaimsList {...props} />
        </FadeIn>
      </Spacing>
    </>
  )
}

export default Claims
