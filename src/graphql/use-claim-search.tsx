import {
  ClaimSearchOptions,
  ClaimSearchQueryHookResult,
  useClaimSearchLazyQuery,
} from '../api/generated/graphql'

type ClaimSearchReturnTuple = [
  (options?: ClaimSearchOptions) => void,
  ClaimSearchQueryHookResult,
]

export const useClaimSearch = (): ClaimSearchReturnTuple => {
  const [claimSearchQuery, queryResult] = useClaimSearchLazyQuery()

  const claimSearch = (options?: ClaimSearchOptions) => {
    claimSearchQuery({
      variables: {
        options: {
          page: options?.page ?? 0,
          pageSize: options?.pageSize ?? 20,
          sortBy: options?.sortBy ?? 'DATE',
          sortDirection: options?.sortDirection ?? 'DESC',
        },
      },
    })
  }

  return [claimSearch, queryResult]
}
