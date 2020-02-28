import {
  MainHeadline,
  SecondLevelHeadline,
  ThirdLevelHeadline,
} from 'hedvig-ui/typography'
import * as React from 'react'

export default {
  title: 'Typography',
}

export const Headlines: React.FC = () => (
  <>
    <MainHeadline>Main headline</MainHeadline>
    <SecondLevelHeadline>Second level headline</SecondLevelHeadline>
    <ThirdLevelHeadline>Third level headline</ThirdLevelHeadline>
  </>
)
