import styled from 'react-emotion'

export const MainHeadline = styled('h1')``
export const SecondLevelHeadline = styled('h2')``
export const ThirdLevelHeadline = styled('h3')``
export const FourthLevelHeadline = styled('h4')`
  margin-block-start: 0;
  margin-block-end: 0;
`
export const Paragraph = styled('p')``

export const Capitalized = styled('div')`
  display: inline-block;
  ::first-letter {
    text-transform: uppercase;
  }
  text-transform: lowercase;
`

export const Placeholder = styled('div')`
  && {
    display: inline-block;
    color: ${({ theme }) => theme.placeholderColor};
  }
`

export const Bold = styled('strong')`
  color: inherit !important;
`
