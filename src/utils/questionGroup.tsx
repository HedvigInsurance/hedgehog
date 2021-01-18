import { QuestionGroup } from 'api/generated/graphql'
import { FilterState } from 'components/questions/filter'
import { Market } from 'types/enums'
import { hasOpenClaim } from 'utils/claim'
import { isMemberIdEven } from 'utils/member'

export const doTeamFilter = (selectedFilters: ReadonlyArray<FilterState>) => (
  questionGroup: QuestionGroup,
): boolean =>
  (selectedFilters.includes(FilterState.Even) &&
    isMemberIdEven(questionGroup.memberId)) ||
  (selectedFilters.includes(FilterState.Odd) &&
    !isMemberIdEven(questionGroup.memberId))

export const doMarketFilter = (selectedFilters: ReadonlyArray<FilterState>) => (
  questionGroup: QuestionGroup,
): boolean =>
  (selectedFilters.includes(FilterState.Sweden) &&
    !questionGroup?.member?.contractMarketInfo?.market) ||
  (selectedFilters.includes(FilterState.Sweden) &&
    questionGroup?.member?.contractMarketInfo?.market === Market.Sweden) ||
  (selectedFilters.includes(FilterState.Norway) &&
    questionGroup?.member?.contractMarketInfo?.market === Market.Norway) ||
  (selectedFilters.includes(FilterState.Denmark) &&
    questionGroup?.member?.contractMarketInfo?.market === Market.Denmark)

export const doClaimFilter = (selectedFilters: ReadonlyArray<FilterState>) => (
  questionGroup: QuestionGroup,
): boolean => {
  if (!questionGroup.member) {
    return true
  }
  return (
    (selectedFilters.includes(FilterState.HasOpenClaim) &&
      hasOpenClaim(questionGroup.member.claims)) ||
    (selectedFilters.includes(FilterState.NoOpenClaim) &&
      !hasOpenClaim(questionGroup.member.claims))
  )
}
