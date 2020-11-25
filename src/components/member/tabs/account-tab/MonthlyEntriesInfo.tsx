import { Spacing } from 'hedvig-ui/spacing'
import { FourthLevelHeadline, MainHeadline } from 'hedvig-ui/typography'
import React from 'react'

export const MonthlyEntriesInfo: React.FC = () => {
  return (
    <Spacing top="large">
      <MainHeadline>Monthly Entries</MainHeadline>
      <FourthLevelHeadline>
        Entries that will be added once <strong>every month</strong> to the
        member's account. <br /> <strong>Note.</strong> They are always added,
        regardless of contract status, to their full amount. You can remove them
        though.
      </FourthLevelHeadline>
    </Spacing>
  )
}
