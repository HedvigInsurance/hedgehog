import styled, { css, keyframes } from 'react-emotion'

const spin = keyframes`
  from{transform: rotate(0deg)}
  to{transform: rotate(360deg)}
`
export const RefreshButton = styled.button<{ loading: boolean }>`
  background: transparent;
  font-size: 0.875em;
  color: ${({ theme }) => theme.mutedText};
  padding: 0;
  border: 0;
  margin-left: 1rem;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  transition: transform 500ms;
  ${({ loading }) =>
    loading &&
    css`
      animation: ${spin} 500ms linear infinite;
    `};
`
