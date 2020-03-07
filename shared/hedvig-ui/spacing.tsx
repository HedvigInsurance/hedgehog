import styled from 'react-emotion'

export type SpacingSize = 'small' | 'medium' | 'large'
export type SpacingDirection = 'top' | 'right' | 'bottom' | 'left' | 'all'

export interface SpacingProps
  extends Partial<Record<SpacingDirection, boolean | SpacingSize>> {}

export const spacingMap: Record<SpacingSize, string> = {
  small: '0.5rem',
  medium: '1rem',
  large: '2rem',
}

export const Spacing = styled('div')<SpacingProps>`
  padding-top: ${({ top, all }) => {
    if (!top && !all) {
      return 0
    }
    return spacingMap[
      top === true || all === true ? 'medium' : (top as SpacingSize)
    ]
  }};
  padding-right: ${({ right, all }) => {
    if (!right && !all) {
      return 0
    }
    return spacingMap[
      right === true || all === true ? 'medium' : (right as SpacingSize)
    ]
  }};
  padding-bottom: ${({ bottom, all }) => {
    if (!bottom && !all) {
      return 0
    }
    return spacingMap[
      bottom === true || all === true ? 'medium' : (bottom as SpacingSize)
    ]
  }};
  padding-left: ${({ left, all }) => {
    if (!left && !all) {
      return 0
    }
    return spacingMap[
      left === true || all === true ? 'medium' : (left as SpacingSize)
    ]
  }};
`
