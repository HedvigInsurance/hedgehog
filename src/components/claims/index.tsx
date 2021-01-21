import { Claim } from 'api/generated/graphql'
import { Paginator } from 'components/shared/paginator/Paginator'
import { useListClaims } from 'graphql/use-list-claims'
import { FadeIn } from 'hedvig-ui/animations/fade-in'
import { LoadingMessage } from 'hedvig-ui/animations/standalone-message'
import { Spacing } from 'hedvig-ui/spacing'
import React from 'react'
import { Header } from 'semantic-ui-react'
import { history } from 'store'
import { useVerticalKeyboardNavigation } from 'utils/keyboard-actions'
import { ClaimListHeader } from './claims-list/components/ClaimListHeader'
import { ClaimListItem } from './claims-list/components/ClaimListItem'

export const Claims: React.FC = () => {
  const [
    { claims, page, totalPages },
    listClaims,
    { loading },
  ] = useListClaims()

  const [currentKeyboardNavigationStep] = useVerticalKeyboardNavigation({
    maxStep: claims.length - 1,
    onPerformNavigation: (index) => {
      const claimId = claims[index].id
      const memberId = claims[index].member?.memberId

      if (!claimId || !memberId) {
        return
      }

      history.push(`/claims/${claimId}/members/${memberId}`)
    },
  })

  React.useEffect(() => {
    listClaims()
  }, [])

  if (loading && !claims) {
    return (
      <>
        <FadeIn>
          <Header size="huge">Claims List</Header>
        </FadeIn>
        <LoadingMessage paddingTop={'25vh'} />
      </>
    )
  }

  return (
    <>
      <FadeIn>
        <Header size="huge">Claims List</Header>
      </FadeIn>
      <Spacing top={'small'}>
        <FadeIn delay={'200ms'}>
          <Paginator<Claim>
            currentPage={page}
            totalPages={totalPages}
            onChangePage={(nextPage) =>
              listClaims({
                includeAll: true,
                page: nextPage,
                pageSize: 20,
              })
            }
            pagedItems={claims}
            itemContent={(claim, index) => (
              <ClaimListItem
                index={index}
                item={claim}
                active={currentKeyboardNavigationStep === index}
              />
            )}
            tableHeader={
              <ClaimListHeader
                onSort={(column, direction) => {
                  listClaims({
                    includeAll: true,
                    page,
                    pageSize: 20,
                    sortBy: column,
                    sortDirection: direction,
                  })
                }}
              />
            }
          />
        </FadeIn>
      </Spacing>
    </>
  )
}
