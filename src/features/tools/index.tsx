import {
  StagingTools,
  stagingToolsAvailable,
} from 'features/tools/staging-tools'
import { FadeIn } from 'hedvig-ui/animations/fade-in'
import { Card, CardsWrapper } from 'hedvig-ui/card'
import React from 'react'
import styled from 'react-emotion'
import { Link } from 'react-router-dom'

const Icon = styled('div')`
  font-size: 2rem;
  padding-bottom: 1rem;
`

export const CardLink = Card.withComponent(Link)

export const Tools: React.FC = () => (
  <FadeIn>
    <CardsWrapper>
      <CardLink to="/tools/charges" span={4}>
        <Icon>💰</Icon>
        Approve charges
      </CardLink>

      <CardLink to="/tools/switcher-automation" span={4}>
        <Icon>🏡</Icon>
        Switcher automation
      </CardLink>

      <CardLink to="/tools/perils-editor" span={4}>
        <Icon>📝</Icon>
        Perils editor
      </CardLink>

      <CardLink to="/tools/norwegian-tariff-creator" span={4}>
        <Icon>🛩</Icon>
        Norwegian Price Engine "Gripen"
      </CardLink>

      <CardLink to="/tools/campaign-codes" span={4}>
        <Icon>💵</Icon>
        Campaign Codes
      </CardLink>

      <CardLink to="/tools/itemizer" span={4}>
        <Icon>📱</Icon>
        Itemizer
      </CardLink>

      <CardLink to="/tools/add-terms" span={4}>
        <Icon>📄</Icon>
        Add terms and conditions
      </CardLink>
    </CardsWrapper>

    {stagingToolsAvailable() && <StagingTools />}
  </FadeIn>
)
