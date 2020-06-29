import styled, { keyframes } from 'react-emotion'

const spin = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`

export const Spinner = styled('div')`
  display: inline-block;
  width: 0.95em;
  height: 0.95em;
  border: 0.1em solid currentColor;
  border-top-color: transparent;
  border-radius: 100%;
  animation: ${spin} 500ms linear infinite;
  transform: translateY(0.1em);
`
