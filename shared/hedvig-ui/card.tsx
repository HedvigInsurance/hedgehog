import { colorsV2 } from '@hedviginsurance/brand'
import styled from 'react-emotion'

export const CardsWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: -0.5rem;
`

export interface CardProps {
  span?: number
}

export const Card = styled('div')<CardProps>`
  display: inline-flex;
  width: ${({ span }) => `calc(100%/${span ?? 1})`};
  max-width: 20rem;
  margin: 0.5rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${colorsV2.white};
  border: 1px solid ${colorsV2.lightgray};
  border-radius: 5px;
`
