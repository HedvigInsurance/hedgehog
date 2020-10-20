import { Member } from 'api/generated/graphql'
import { ListHeader } from 'components/members-search/components/ListHeader'
import { ListItem } from 'components/members-search/components/ListItem'
import { SearchForm } from 'components/members-search/components/SearchForm'
import {
  ExtraInstruction,
  Instructions,
  ListWrapper,
  MemberSuggestionsWrapper,
  NoMembers,
} from 'components/members-search/styles'
import BackendPaginatorList from 'components/shared/paginator-list/BackendPaginatorList'
import { useMemberSearch } from 'graphql/use-member-search'
import { MainHeadline } from 'hedvig-ui/typography'
import React, { useRef } from 'react'
import { findDOMNode } from 'react-dom'
import { useHistory } from 'react-router'
import { useVerticalKeyboardNavigation } from 'utils/keyboard-actions'
import { MemberSuggestions } from './components/MemberSuggestions'

/**
 * Semantic UI haven't implemented refs corretly or they collide with react-emotion or something.
 * See https://github.com/Semantic-Org/Semantic-UI-React/issues/3819
 */
const findInputFieldDomElementHackishly = (
  instance: React.ReactElement,
): HTMLInputElement | null => {
  const wrapper = findDOMNode(instance as any) as HTMLInputElement | null

  if (!wrapper) {
    return null
  }

  return wrapper.querySelector('input') ?? null
}

export const MembersSearch: React.FC = () => {
  const [query, setQuery] = React.useState('')
  const [includeAll, setIncludeAll] = React.useState(false)
  const history = useHistory()
  const searchField = useRef<React.ReactElement>()

  const [
    { members, totalPages, page },
    memberSearch,
    { loading },
  ] = useMemberSearch()
  const [
    currentKeyboardNavigationStep,
    resetKeyboardNavigationStep,
  ] = useVerticalKeyboardNavigation({
    maxStep: members.length - 1,
    onNavigationStep: () => {
      const input =
        searchField.current &&
        findInputFieldDomElementHackishly(searchField.current)
      if (input) {
        input.blur()
      }
    },
    onPerformNavigation: (index) => {
      history.push(`/members/${members[index].memberId}`)
    },
    onExit: () => {
      const input =
        searchField.current &&
        findInputFieldDomElementHackishly(searchField.current)
      if (input) {
        input.focus()
      }
    },
  })

  const noMembersFound = members.length === 0 && query && !loading

  React.useEffect(() => {
    resetKeyboardNavigationStep()
  }, [query])

  return (
    <>
      <SearchForm
        onSubmit={() => {
          memberSearch(query || '%', {
            includeAll,
          })
        }}
        loading={loading}
        query={query}
        setQuery={setQuery}
        includeAll={includeAll}
        setIncludeAll={setIncludeAll}
        currentResultSize={members.length}
        searchFieldRef={searchField as any}
        onFocus={resetKeyboardNavigationStep}
      />
      {members.length > 0 && (
        <ListWrapper>
          <BackendPaginatorList<Member>
            currentPage={page}
            totalPages={totalPages}
            changePage={(nextPage) =>
              memberSearch(query, { includeAll, page: nextPage, pageSize: 25 })
            }
            pagedItems={members}
            itemContent={(member, index) => (
              <ListItem
                member={member}
                active={currentKeyboardNavigationStep === index}
              />
            )}
            isSortable={false}
            tableHeader={<ListHeader />}
          />
        </ListWrapper>
      )}
      {members.length === 0 && !query && (
        <>
          <Instructions>
            <h1>Search for members</h1>
            <div>
              Search by <em>member id</em>, <em>personnummer</em>,{' '}
              <em>email</em>, <em>phone</em> or <em>name</em>
            </div>
            <div>
              <br />
              <code>%</code> is a wildcard character, it can be used to search
              for anything
            </div>
            <div>
              Example: <code>He%g</code> will match both <code>Hedvig</code> and{' '}
              <code>Hedgehog</code>
            </div>
            {query && (
              <ExtraInstruction>Press enter to search</ExtraInstruction>
            )}
          </Instructions>

          <MemberSuggestionsWrapper>
            <MainHeadline>Suggestions</MainHeadline>
            <MemberSuggestions />
          </MemberSuggestionsWrapper>
        </>
      )}

      {noMembersFound && (
        <NoMembers>
          <div>D*shborad! No members found</div>
        </NoMembers>
      )}
    </>
  )
}
