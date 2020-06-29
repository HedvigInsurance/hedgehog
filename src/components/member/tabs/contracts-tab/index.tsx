import { Contract } from 'components/member/tabs/contracts-tab/contract'
import { useContracts } from 'graphql/use-contracts'
import { MainHeadline } from 'hedvig-ui/typography'
import React from 'react'
import { ArrowRepeat } from 'react-bootstrap-icons'
import styled, { css, keyframes } from 'react-emotion'

const Headline = styled(MainHeadline)`
  display: flex;
  align-items: center;
`

const spin = keyframes`
  from{transform: rotate(0deg)}
  to{transform: rotate(360deg)}
`
const RefreshButton = styled('button')<{ loading: boolean }>`
  background: transparent;
  font-size: 0.875em;
  color: ${({ theme }) => theme.mutedText};
  padding: 0;
  border: 0;
  margin-left: 1rem;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: transform 500ms;
  ${({ loading }) =>
    loading &&
    css`
      animation: ${spin} 500ms linear infinite;
    `};
`

export const ContractTab: React.FunctionComponent<{
  memberId: string
}> = ({ memberId }) => {
  const [contracts, { loading, refetch }] = useContracts(memberId)
  return (
    <>
      <Headline>
        Contracts
        <RefreshButton onClick={() => refetch()} loading={loading}>
          <ArrowRepeat />
        </RefreshButton>
      </Headline>
      {loading && 'Loading...'}
      {!loading && contracts.length === 0 && 'No contract for member'}
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
    </>
  )
}
