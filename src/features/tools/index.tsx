import { Card, CardsWrapper } from 'hedvig-ui/card'
import * as React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

const Icon = styled('div')`
  font-size: 2rem;
  padding-bottom: 1rem;
`

const CardLink = Card.withComponent(Link)

export const Tools: React.FC = () => (
  <CardsWrapper>
    <CardLink to="/tools/charges">
      <Icon>💰</Icon>
      Approve charges
    </CardLink>

    <CardLink to="/tools/switcher-automation">
      <Icon>🏡</Icon>
      Switcher automation
    </CardLink>
  </CardsWrapper>
)
