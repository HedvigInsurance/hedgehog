import { colorsV3, fonts } from '@hedviginsurance/brand'
import { createMuiTheme } from '@material-ui/core/styles'
import styled, { css } from 'react-emotion'

export const lightTheme = {
  type: 'light',
  background: colorsV3.gray100,
  backgroundLight: colorsV3.white,
  accentBackground: colorsV3.gray300,
  accentBackgroundHighlight: colorsV3.gray100,
  foreground: colorsV3.gray900,
  semiStrongForeground: colorsV3.gray700,
  placeholderColor: colorsV3.gray500,
  border: '#c6d6e4',
  borderStrong: '#36658f',
  backgroundTransparent: 'rgba(0, 0, 0, .1)',
  accent: '#36658f',
  accentLight: '#c6d6e4',
  accentLighter: '#e0eaf3',
  accentContrast: colorsV3.white,
  accentSecondary: colorsV3.gray300,
  accentSecondaryLight: colorsV3.gray100,
  accentSecondaryContrast: colorsV3.gray900,
  accentThird: '#c6d6e4',
  accentThirdLight: '#e0eaf3',
  accentThirdContrast: colorsV3.gray900,
  danger: '#e24646',
  success: '#199381',
  warning: '#fbd45b',
  mutedText: colorsV3.gray500,
  mutedBackground: colorsV3.gray300,
  defaultButtonBackground: colorsV3.gray300,
  highlightedButtonBackground: colorsV3.gray500,
  activeInsuranceBackground: '#199381',
  activeInsuranceForeground: '#fff',
  pendingInsuranceBackground: '#fbd45b',
  pendingInsuranceForeground: '#fff',
  terminatedInsuranceBackground: '#e24646',
  terminatedInsuranceForeground: '#fff',
}

export const darkTheme: typeof lightTheme = {
  type: 'dark',
  background: colorsV3.gray900,
  backgroundLight: colorsV3.gray800,
  accentBackground: colorsV3.gray700,
  accentBackgroundHighlight: colorsV3.gray900,
  foreground: colorsV3.white,
  semiStrongForeground: colorsV3.gray500,
  placeholderColor: colorsV3.gray500,
  border: '#203446',
  borderStrong: '#4581b5',
  backgroundTransparent: 'rgba(255, 255, 255, .1)',
  accent: '#4581b5',
  accentLight: '#203446',
  accentLighter: '#192b3c',
  accentContrast: colorsV3.white,
  accentSecondary: colorsV3.gray500,
  accentSecondaryLight: colorsV3.gray700,
  accentSecondaryContrast: colorsV3.gray900,
  accentThird: '#203446',
  accentThirdLight: '#192b3c',
  accentThirdContrast: colorsV3.white,
  danger: '#e24646',
  success: '#199381',
  warning: '#fbd45b',
  mutedText: colorsV3.gray500,
  mutedBackground: colorsV3.gray700,
  defaultButtonBackground: colorsV3.gray800,
  highlightedButtonBackground: colorsV3.gray500,
  activeInsuranceBackground: '#199381',
  activeInsuranceForeground: '#fff',
  pendingInsuranceBackground: '#fbd45b',
  pendingInsuranceForeground: '#fff',
  terminatedInsuranceBackground: '#e24646',
  terminatedInsuranceForeground: '#fff',
}

export const lightUiTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: lightTheme.accent,
      dark: lightTheme.accentLight,
    },
    secondary: {
      main: lightTheme.accentSecondary,
      dark: lightTheme.accentSecondaryLight,
    },
    common: {
      black: lightTheme.background,
      white: lightTheme.foreground,
    },
    text: {
      primary: lightTheme.foreground,
      secondary: lightTheme.foreground,
    },
    background: {
      paper: lightTheme.accentLighter,
      default: lightTheme.background,
    },
  },
  typography: {
    fontFamily: [fonts.FAVORIT, 'sans-serif'].join(','),
  },
  props: {
    MuiInput: {
      disableUnderline: true,
    },
    MuiExpansionPanel: {
      elevation: 0,
    },
    MuiInputLabel: {
      disableAnimation: true,
      shrink: false,
    },
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: '0.5rem',
      },
    },
    MuiMenu: {
      paper: {
        background: lightTheme.background,
      },
    },
    MuiExpansionPanel: {
      rounded: {
        borderRadius: '0.5rem',
      },
    },
    MuiInputLabel: {
      formControl: {
        zIndex: 1,
        transform: 'translateY(0)',
        '&$focused': {
          color: lightTheme.foreground + '!important',
        },
      },
    },
    MuiInput: {
      root: {
        width: '100%',
        background: lightTheme.backgroundLight,
        border: '1px solid ' + lightTheme.border,
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        padding: 0,
      },
      input: {
        padding: '1rem 1.5rem',
      },
    },
    MuiSelect: {
      select: {
        padding: '1rem 1.5rem',
      },
      selectMenu: {
        borderRadius: '0.5rem',
      },
    },
    MuiButton: {
      contained: {
        boxShadow: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: lightTheme.accent,
      },
    },
  },
})

export const darkUiTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: darkTheme.accent,
      dark: darkTheme.accentLight,
    },
    secondary: {
      main: darkTheme.accentSecondary,
      dark: darkTheme.accentSecondaryLight,
    },
    common: {
      black: darkTheme.background,
      white: darkTheme.foreground,
    },
    text: {
      primary: darkTheme.foreground,
      secondary: darkTheme.foreground,
    },
    background: {
      paper: darkTheme.accentLighter,
      default: darkTheme.background,
    },
  },
  typography: {
    fontFamily: [fonts.FAVORIT, 'sans-serif'].join(','),
  },
  props: {
    MuiInput: {
      disableUnderline: true,
    },
    MuiExpansionPanel: {
      elevation: 0,
    },
    MuiInputLabel: {
      disableAnimation: true,
      shrink: false,
    },
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: '0.5rem',
      },
    },
    MuiMenu: {
      paper: {
        background: darkTheme.background,
      },
    },
    MuiExpansionPanel: {
      rounded: {
        borderRadius: '0.5rem',
      },
    },
    MuiInputLabel: {
      formControl: {
        zIndex: 1,
        transform: 'translateY(0)',
        '&$focused': {
          color: darkTheme.foreground + '!important',
        },
      },
    },
    MuiInput: {
      root: {
        width: '100%',
        background: darkTheme.backgroundLight,
        border: '1px solid ' + darkTheme.border,
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        padding: 0,
      },
      input: {
        padding: '1rem 1.5rem',
      },
    },
    MuiSelect: {
      select: {
        padding: '1rem 1.5rem',
      },
      selectMenu: {
        borderRadius: '0.5rem',
      },
    },
    MuiButton: {
      contained: {
        boxShadow: 'none',
        borderRadius: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: darkTheme.accent,
      },
    },
  },
})

export const SemanticOverrides = styled('div')`
  ${({ theme }) => css`
    a {
      color: ${theme.accent};
      transition: color 200ms;
      &:hover,
      &:focus {
        color: ${theme.accentLight};
      }
    }

    strong {
      color: ${theme.foreground};
    }

    .ui.breadcrumb {
      a {
        color: ${theme.mutedText};
        &:hover,
        &:focus {
          text-decoration: underline;
        }
      }
      .divider {
        color: ${theme.mutedText};
      }
      .active.section {
        font-weight: normal;
      }
    }

    .ui.label {
      background: ${theme.accentBackground};
      color: ${theme.foreground};
    }

    .ui.input {
      input {
        font-family: ${fonts.FAVORIT}, sans-serif;
        background: ${theme.background};
        color: ${theme.foreground};
        border-color: ${theme.border};
        &::placeholder {
          color: ${theme.placeholderColor};
        }
      }
    }

    .ui.dropdown {
      background: ${theme.background};
      border-color: ${theme.border};
      color: ${theme.foreground};

      &.visible .text,
      .text {
        color: ${theme.foreground} !important;
      }
      &.selection .menu .item {
        background: ${theme.background};
        color: ${theme.foreground};
        border-color: ${theme.border};
      }
    }

    .ui.checkbox {
      input + label:before,
      input:focus + label:before,
      input:checked + label:before {
        background: ${theme.background};
        border-color: ${theme.borderStrong};
      }

      label,
      input:focus + label,
      input:checked + label {
        color: ${theme.foreground};
      }

      input:checked + label:after {
        color: ${theme.foreground};
      }
    }

    .ui.form {
      textarea,
      input {
        border-color: ${theme.border};
        background: ${theme.background};
        color: ${theme.foreground};
        border: 1px solid ${theme.border};
        border-radius: 0.5rem;
      }
    }

    .ui.button {
      font-weight: normal;
      font-family: ${fonts.FAVORIT}, sans-serif;
      background: ${theme.foreground};
      color: ${theme.background};
      border-radius: 0.5rem;

      &:hover,
      &:focus {
        background: ${theme.foreground};
        color: ${theme.background};
      }

      &.primary {
        background: ${theme.accent};
        color: ${theme.accentContrast};

        &:hover,
        &:focus {
          background: ${theme.accentLight};
          color: ${theme.accentContrast};
        }
      }

      .buttons &:not(:last-of-type),
      .buttons &:not(:first-of-type) {
        border-radius: 0;
      }
    }

    .ui.table {
      border: 0;
      border-radius: 0.5rem;
      overflow: hidden;
      background: ${theme.accentLighter};
      color: ${theme.foreground};

      thead th {
        &,
        &.sorted,
        &.sorted:hover,
        &.sorted:focus,
        &:hover,
        &:focus {
          background: ${theme.accentLight};
          color: ${theme.foreground};
          border: 0;
          color: ${theme.semiStrongForeground};
          font-weight: normal;
          padding: 1rem 2rem 0.5rem 2rem;
          text-transform: uppercase;
          font-size: 0.75rem;
        }
      }

      tbody td {
        color: ${theme.foreground};
        border: ${theme.borderStrong};
        background: ${theme.accentLighter};
        padding: 1.125rem;
        border: 0;
        border-top: 1px solid ${theme.border};
        border-left: 1px solid ${theme.border};
      }
      td:first-of-type {
        border-left: 0;
      }
      tr:first-of-type td {
        border-top: 0;
      }
    }

    .ui.segment {
      background: ${theme.background};
      padding: 0;
      border: 0;
      box-shadow: none;
    }

    .ui.tabular.menu {
      margin-bottom: 4rem;
      padding-bottom: 0;
      border-bottom: 2px solid ${theme.border};

      .item {
        padding: 0;
        margin-bottom: -2px;
        border: 0;
        border-bottom: 2px solid transparent;
        margin-right: 3rem;
        line-height: 1.5;

        background: transparent;
        color: ${theme.semiStrongForeground};

        &.active,
        &:hover,
        &:focus {
          font-weight: normal;
          border-bottom-color: ${theme.semiStrongForeground};
          background: transparent;
          color: ${theme.foreground};
        }
      }
    }

    .ui.header {
      color: ${theme.foreground};
    }
  `};
`
