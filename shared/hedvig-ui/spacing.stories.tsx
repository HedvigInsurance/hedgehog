import { colorsV2 } from '@hedviginsurance/brand'
import { boolean, select, withKnobs } from '@storybook/addon-knobs'
import { Spacing, SpacingSize } from 'hedvig-ui/spacing'
import * as React from 'react'
import styled from 'react-emotion'

export default {
  title: 'Spacing',
  component: Spacing,
  decorators: [withKnobs],
}

const SpacingColored = styled(Spacing)`
  border: 1px solid ${colorsV2.coral500};
  background-color: ${colorsV2.coral500};
`

const Item = styled('div')`
  background-color: white;
  border: 1px solid #000;
`

export const SpacingBoolean: React.FC = () => (
  <SpacingColored
    top={boolean('top', false)}
    right={boolean('right', false)}
    bottom={boolean('bottom', false)}
    left={boolean('left', false)}
  >
    <Item>contents</Item>
  </SpacingColored>
)

const sizes: SpacingSize[] = ['small', 'medium', 'large']
export const SpacingEnum: React.FC = () => (
  <SpacingColored
    top={select('top', sizes, 'medium')}
    right={select('right', sizes, 'medium')}
    bottom={select('bottom', sizes, 'medium')}
    left={select('left', sizes, 'medium')}
  >
    <Item>contents</Item>
  </SpacingColored>
)
