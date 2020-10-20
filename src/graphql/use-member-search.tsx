import {
  MemberSearchOptions,
  MemberSearchQueryHookResult,
  MemberSearchResult,
  useMemberSearchLazyQuery,
} from 'api/generated/graphql'

type MemberSearchReturnTuple = [
  MemberSearchResult,
  (query: string, options?: MemberSearchOptions) => void,
  MemberSearchQueryHookResult,
]

export const useMemberSearch = (): MemberSearchReturnTuple => {
  const [memberSearchQuery, queryResult] = useMemberSearchLazyQuery()

  const memberSearch = (query: string, options?: MemberSearchOptions) => {
    memberSearchQuery({
      variables: {
        query,
        options: {
          includeAll: options?.includeAll ?? false,
          page: options?.page ?? 0,
          pageSize: options?.pageSize ?? 25,
          sortBy: options?.sortBy ?? 'SIGN_UP',
          sortDirection: options?.sortDirection ?? 'DESC',
        },
      },
    })
  }
  const { members = [], page = 0, totalPages = 0 } = {
    ...queryResult?.data?.memberSearch,
  }

  const memberSearchResult = {
    members,
    totalPages,
    page,
  }

  return [memberSearchResult as MemberSearchResult, memberSearch, queryResult]
}
