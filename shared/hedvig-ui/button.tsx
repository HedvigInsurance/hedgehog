import { colorsV2 } from '@hedviginsurance/brand'
import styled from 'react-emotion'

export interface ButtonProps {
  variation?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  fullWidth?: boolean
  basic?: boolean
  size?: 'small' | 'medium' | 'large'
}

export const buttonColorMap: Record<
  NonNullable<ButtonProps['variation']>,
  { foreground: string; background: string }
> = {
  primary: { foreground: colorsV2.white, background: colorsV2.violet500 },
  secondary: { foreground: colorsV2.white, background: colorsV2.midnight500 },
  success: { foreground: colorsV2.white, background: colorsV2.ocean700 },
  danger: { foreground: colorsV2.white, background: colorsV2.coral700 },
  warning: { foreground: '#000', background: colorsV2.sunflower500 },
}

export const buttonSizeMap: Record<
  NonNullable<ButtonProps['size']>,
  { fontSize: string; padding: string }
> = {
  small: {
    fontSize: '0.75rem',
    padding: '0.5rem 0.75rem',
  },
  medium: {
    fontSize: '1rem',
    padding: '0.75rem 1rem',
  },
  large: {
    fontSize: '1.25rem',
    padding: '1rem 1.5rem',
  },
}

export const Button = styled('button')<ButtonProps>(
  ({ variation = 'primary', fullWidth, basic, size = 'medium' }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    fontSize: buttonSizeMap[size].fontSize,
    padding: buttonSizeMap[size].padding,
    width: fullWidth ? '100%' : 'auto',
    background: basic ? 'transparent' : buttonColorMap[variation].background,
    color: basic
      ? buttonColorMap[variation].background
      : buttonColorMap[variation].foreground,
    border: `1px solid ${buttonColorMap[variation].background}`,
    boxShadow: 'none !important',
    borderRadius: 5,
    cursor: 'pointer',

    '&:hover, &:focus': {
      background: buttonColorMap[variation].background,
      color: buttonColorMap[variation].foreground,
    },
  }),
)
