import { action } from '@storybook/addon-actions'
import { Popover } from 'hedvig-ui/popover'
import React from 'react'
import styled from 'react-emotion'

export default {
  title: 'Popover',
  component: Popover,
}

const PopoverWrapper = styled('div')`
  display: inline-block;
  padding-top: 5rem;
  padding-left: 5rem;

  color: ${({ theme }) => theme.foreground};
`

export const StandardPopover = () => (
  <PopoverWrapper>
    <Popover
      contents={<>I'm a popover</>}
      onOpen={action('Open')}
      onClose={action('Close')}
    >
      Hover me
    </Popover>
  </PopoverWrapper>
)
