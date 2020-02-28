import { action } from '@storybook/addon-actions'
import { boolean, select, withKnobs } from '@storybook/addon-knobs'
import { Button, buttonColorMap, ButtonProps } from 'hedvig-ui/button'
import * as React from 'react'
import { WithStory } from './story-utils'

export default {
  title: 'Button',
  component: Button,
  decorators: [withKnobs],
}

const colors: ReadonlyArray<NonNullable<
  ButtonProps['variation']
>> = Object.keys(buttonColorMap) as any
const sizes: ReadonlyArray<NonNullable<ButtonProps['size']>> = [
  'small',
  'medium',
  'large',
]

export const Text = () => {
  return (
    <Button
      onClick={action('clicked')}
      variation={select('variation', colors, 'primary')}
      size={select('Size', sizes, 'medium')}
      basic={boolean('Basic', false)}
    >
      Hello Button
    </Button>
  )
}

export const Emoji: React.FC & WithStory = () => (
  <Button
    onClick={action('clicked')}
    variation={select('variation', colors, 'primary')}
    size={select('Size', sizes, 'medium')}
    basic={boolean('Basic', false)}
  >
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
)

Emoji.story = {
  name: 'with emoji',
}
