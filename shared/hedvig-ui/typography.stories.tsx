import { Input } from 'hedvig-ui/input'
import { Spacing } from 'hedvig-ui/spacing'
import {
  Bold,
  Capitalized,
  FourthLevelHeadline,
  MainHeadline,
  Paragraph,
  Placeholder,
  SecondLevelHeadline,
  ThirdLevelHeadline,
} from 'hedvig-ui/typography'
import React from 'react'

export default {
  title: 'Typography',
}

export const Headlines: React.FC = () => (
  <>
    <MainHeadline>Main headline</MainHeadline>
    <SecondLevelHeadline>Second level headline</SecondLevelHeadline>
    <ThirdLevelHeadline>Third level headline</ThirdLevelHeadline>
    <FourthLevelHeadline>Fourth level headline</FourthLevelHeadline>
    <Paragraph>Paragraph</Paragraph>
    <Bold>Bold</Bold>
  </>
)

export const Utilities: React.FC = () => {
  const [text, setText] = React.useState('CaPiTaLiZeD')
  return (
    <>
      <Input value={text} onChange={(e) => setText(e.currentTarget.value)} />
      <Spacing top={'small'} />
      <Capitalized>{text}</Capitalized>
      <Spacing top={'medium'} />
      <Placeholder>This is a placeholder</Placeholder>
    </>
  )
}
