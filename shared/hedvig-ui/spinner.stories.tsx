import { Spinner } from 'hedvig-ui/sipnner'
import React from 'react'
import styled from 'react-emotion'

export default {
  title: 'Spinner',
  component: Spinner,
}

export const StandardSpinner = () => <Spinner />

const BigColoredText = styled('div')`
  color: ${({ theme }) => theme.danger};
  font-size: 5rem;
`
export const BigColoredSpinner = () => (
  <BigColoredText>
    <Spinner />
  </BigColoredText>
)
