import {
  GetQuotesQueryHookResult,
  Quote,
  useGetQuotesQuery,
} from 'api/generated/graphql'
import { parseISO } from 'date-fns'

type GetQuotesReturnTuple = [ReadonlyArray<Quote>, GetQuotesQueryHookResult]

const latest = (a: Quote, b: Quote) =>
  Number(parseISO(b.createdAt)) - Number(parseISO(a.createdAt))

export const useQuotes = (memberId: string): GetQuotesReturnTuple => {
  const queryResult = useGetQuotesQuery({
    variables: {
      memberId,
    },
  })
  const quotes = [...(queryResult.data?.member?.quotes ?? [])] as Quote[]

  return [quotes.sort(latest), queryResult]
}
