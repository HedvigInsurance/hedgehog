import { select } from '@storybook/addon-knobs'
import { ThemeProvider } from 'emotion-theming'
import { darkTheme, lightTheme } from 'hedvig-ui/themes'
import React from 'react'
import styled from 'react-emotion'

const ThemeWrapper = styled('div')`
  min-height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
`

export const withTheme = (story: () => React.ReactElement) => (
  <ThemeProvider
    theme={
      { lightTheme, darkTheme }[
        select('Theme', ['lightTheme', 'darkTheme'], 'lightTheme')
      ]
    }
  >
    <ThemeWrapper>{story()}</ThemeWrapper>
  </ThemeProvider>
)
