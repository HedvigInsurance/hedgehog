import styled from 'react-emotion'

export type SpacingSize = 'small' | 'medium' | 'large'
export type SpacingDirection = 'top' | 'right' | 'bottom' | 'left'

export interface SpacingProps
  extends Partial<Record<SpacingDirection, boolean | SpacingSize>> {}

export const spacingMap: Record<SpacingSize, string> = {
  small: '0.5rem',
  medium: '1rem',
  large: '2rem',
}

export const Spacing = styled('div')<SpacingProps>`
  padding-top: ${({ top }) => {
    if (!top) {
      return 0
    }
    return spacingMap[top === true ? 'medium' : (top as SpacingSize)]
  }};
  padding-right: ${({ right }) => {
    if (!right) {
      return 0
    }
    return spacingMap[right === true ? 'medium' : (right as SpacingSize)]
  }};
  padding-bottom: ${({ bottom }) => {
    if (!bottom) {
      return 0
    }
    return spacingMap[bottom === true ? 'medium' : (bottom as SpacingSize)]
  }};
  padding-left: ${({ left }) => {
    if (!left) {
      return 0
    }
    return spacingMap[left === true ? 'medium' : (left as SpacingSize)]
  }};
`
