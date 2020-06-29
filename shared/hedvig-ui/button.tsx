import { colorsV3 } from '@hedviginsurance/brand'
import { Spinner } from 'hedvig-ui/sipnner'
import { Spacing } from 'hedvig-ui/spacing'
import React from 'react'
import styled from 'react-emotion'
import { lightTheme } from './themes'

export const ButtonsGroup = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  '*:not(:last-child)': {
    marginRight: '0.5rem',
  },
  '*:not(:first-child)': {
    marginLeft: '0.5rem',
  },
})

export interface ButtonProps {
  variation?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'third'
    | 'success'
    | 'warning'
    | 'danger'
  fullWidth?: boolean
  halfWidth?: boolean
  basic?: boolean
  size?: 'small' | 'medium' | 'large'
  icon?: React.ReactNode
  loading?: boolean
  disabled?: boolean
}

export const buttonColorMap: (
  theme: typeof lightTheme,
) => Record<
  NonNullable<ButtonProps['variation']>,
  { foreground: string; background: string; highlighted: string }
> = (theme = lightTheme) => ({
  default: {
    foreground: theme.foreground,
    background: theme.accentBackground,
    highlighted: theme.accentBackgroundHighlight,
  },
  primary: {
    foreground: theme.accentContrast,
    background: theme.accent,
    highlighted: theme.accentLight,
  },
  secondary: {
    foreground: theme.accentSecondaryContrast,
    background: theme.accentSecondary,
    highlighted: theme.accentSecondaryLight,
  },
  third: {
    foreground: theme.accentThirdContrast,
    background: theme.accentThird,
    highlighted: theme.accentThirdLight,
  },
  success: {
    foreground: colorsV3.white,
    background: theme.success,
    highlighted: theme.success,
  },
  danger: {
    foreground: colorsV3.white,
    background: theme.danger,
    highlighted: theme.danger,
  },
  warning: {
    foreground: '#000',
    background: theme.warning,
    highlighted: theme.warning,
  },
})

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

export const ButtonComponent = styled('button')<ButtonProps>(
  ({
    variation = 'default',
    fullWidth,
    halfWidth,
    basic,
    size = 'medium',
    theme,
  }) => {
    const colors = buttonColorMap(theme)[variation]
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      whiteSpace: 'nowrap',
      fontSize: buttonSizeMap[size].fontSize,
      fontFamily: 'inherit',
      padding: buttonSizeMap[size].padding,
      width: fullWidth ? '100%' : 'auto',
      minWidth: halfWidth ? '50%' : 'auto',
      background: basic ? 'transparent' : colors.background,
      color: (basic ? colors.background : colors.foreground) + ' !important',
      border: `1px solid ${colors.background}`,
      boxShadow: 'none !important',
      borderRadius: 8,
      cursor: 'pointer',
      transition: 'background 200ms, border 200ms, color 200ms, opacity 200ms',
      '&:hover, &:focus': {
        outline: 'none',
        color: colors.foreground,
        background: colors.highlighted,
        borderColor: colors.highlighted,
      },
      '&:disabled': {
        opacity: 0.5,
      },
    }
  },
)

const withLoader = <TElementAttributes extends object>(
  Component: React.ComponentType<ButtonProps | TElementAttributes>,
): React.FC<ButtonProps & TElementAttributes> => ({
  loading,
  children,
  ...props
}) => {
  return (
    <Component {...props} disabled={props.disabled || loading}>
      <>
        {children}
        {loading && (
          <Spacing inline left="small">
            <Spinner />
          </Spacing>
        )}
        {!loading && props.icon && (
          <Spacing inline left="small">
            {props.icon}
          </Spacing>
        )}
      </>
    </Component>
  )
}

export const Button = withLoader<React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ButtonComponent,
)

export const ButtonLink = withLoader<
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(ButtonComponent.withComponent('a'))
