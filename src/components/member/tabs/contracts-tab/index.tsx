import { Contract } from 'components/member/tabs/contracts-tab/contract'
import { Headline } from 'components/member/tabs/shared/headline'
import { RefreshButton } from 'components/member/tabs/shared/refresh-button'
import { useContracts } from 'graphql/use-contracts'
import { FadeIn } from 'hedvig-ui/animations/fade-in'
import {
  LoadingMessage,
  StandaloneMessage,
} from 'hedvig-ui/animations/standalone-message'
import React from 'react'
import { ArrowRepeat } from 'react-bootstrap-icons'

export const ContractTab: React.FunctionComponent<{
  memberId: string
}> = ({ memberId }) => {
  const [contracts, { loading, refetch }] = useContracts(memberId)

  if (loading) {
    return <LoadingMessage paddingTop="10vh" />
  }

  if (contracts.length === 0) {
    return (
      <StandaloneMessage paddingTop="10vh">
        No contract for member
      </StandaloneMessage>
    )
  }

  return (
    <FadeIn>
      <Headline>
        Contracts
        <RefreshButton onClick={() => refetch()} loading={loading}>
          <ArrowRepeat />
        </RefreshButton>
      </Headline>
      {contracts.map((contract) => (
        <Contract
          key={contract.id}
          contract={contract}
          refetch={refetch}
          shouldPreSelectAgreement={
            contracts.length === 1 && !contract.isTerminated
          }
        />
      ))}
    </FadeIn>
  )
}
