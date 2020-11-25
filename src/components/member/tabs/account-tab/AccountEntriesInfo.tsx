import { Spacing } from 'hedvig-ui/spacing'
import { FourthLevelHeadline, MainHeadline } from 'hedvig-ui/typography'
import React from 'react'

export const AccountEntriesInfo: React.FC = () => {
  return (
    <Spacing top="large">
      <MainHeadline>Account Entries</MainHeadline>
      <FourthLevelHeadline>
        The total amount from the account entries, called the <i>balance</i>, at
        the end of a month, is the amount we will charge a member that month.
      </FourthLevelHeadline>
    </Spacing>
  )
}
