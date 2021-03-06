import { CampaignFilter } from 'api/generated/graphql'
import {
  getDiscountDetails,
  getIncentiveText,
  getValidity,
} from 'features/tools/campaign-codes/utils'
import { usePartnerCampaigns } from 'graphql/use-partner-campaigns'
import { Card } from 'hedvig-ui/card'
import { Popover } from 'hedvig-ui/popover'
import React from 'react'
import { Table } from 'semantic-ui-react'

export const CampaignCodeTable: React.FC<{ filter: CampaignFilter }> = ({
  filter,
}) => {
  const [partnerCampaigns, { loading }] = usePartnerCampaigns(filter)

  if (loading) {
    return <Card span={1}>Loading partner campaigns...</Card>
  }

  if (partnerCampaigns.length === 0) {
    return <Card span={1}>No partner campaigns available</Card>
  }

  return (
    <Card span={1}>
      <Table celled style={{ fontSize: '1.0rem' }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center" width={3}>
              Valid Period
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="left">Campaign Code</Table.HeaderCell>
            <Table.HeaderCell>Campaign Owner</Table.HeaderCell>
            <Table.HeaderCell>Incentive Type</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={3}>
              Discount
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <>
            {partnerCampaigns.map((campaign) => {
              const {
                campaignCode,
                incentive,
                partnerId,
                partnerName,
              } = campaign

              return (
                <Table.Row key={campaign.id}>
                  <Table.Cell textAlign="center">
                    {getValidity(campaign)}
                  </Table.Cell>
                  <Table.Cell>{campaignCode}</Table.Cell>
                  <Table.Cell>
                    <Popover contents={partnerId}>{partnerName}</Popover>
                  </Table.Cell>
                  <Table.Cell width={3}>
                    {getIncentiveText(incentive)}
                  </Table.Cell>
                  <Table.Cell width={3}>
                    {getDiscountDetails(incentive)}
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </>
        </Table.Body>
      </Table>
    </Card>
  )
}
