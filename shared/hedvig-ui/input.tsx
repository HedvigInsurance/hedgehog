import { colorsV3, fonts } from '@hedviginsurance/brand'
import React from 'react'
import styled, { css } from 'react-emotion'
import {
  Input as SemanticInput,
  InputProps,
  LabelProps,
} from 'semantic-ui-react'

export interface CustomInputProps extends InputProps {
  muted?: boolean
  affix?: LabelProps
  affixPosition?: 'left' | 'right'
}

const StyledSemanticInput = styled(SemanticInput)<CustomInputProps>`
  &&&& {
    width: 100%;
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input {
      font-family: ${fonts.FAVORIT};

      transition: background 300ms, border-color 300ms;
      ${({ muted, theme }) =>
        muted &&
        css`
          background-color: ${theme.mutedBackground ?? colorsV3.gray300};
          border-color: ${theme.mutedBackground ?? colorsV3.gray300};
          color: ${theme.mutedText ?? colorsV3.gray500};
        `};
    }
  }
`

export const Input: React.FunctionComponent<CustomInputProps> = (props) => {
  return <StyledSemanticInput {...props} />
}
