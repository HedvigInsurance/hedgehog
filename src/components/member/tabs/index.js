import ClaimsTab from 'components/member/tabs/ClaimsTab'
import { MemberDebtComponent } from 'components/member/tabs/DebtTab'
import DetailsTab from 'components/member/tabs/DetailsTab'
import MemberFile from 'components/member/tabs/FileTab'
import PaymentsTab from 'components/member/tabs/payments-tab'
import { Quotes } from 'components/member/tabs/quote-tab'
import { ContractTab } from 'components/member/tabs/contracts-tab'
import { CreateTicketStandAlone } from 'components/tickets/ticket/create-ticket/create-ticket-stand-alone'

import PropTypes from 'prop-types'
import React from 'react'
import { Tab } from 'semantic-ui-react'
import styled from 'react-emotion'
import { useContractMarketInfo } from 'graphql/use-get-member-contract-market-info'
import { AccountTab } from './account-tab'

const TabContainer = styled(Tab.Pane)`
  &&& {
    display: flex;
    flex-direction: column;
    min-width: 700px;
    margin-bottom: 50px !important;
  }
`

const TabItem = ({ props, TabContent }) => {
  const memberId = props.match.params.memberId
  const [contractMarketInfo] = useContractMarketInfo(memberId)
  return (
    <TabContainer>
      <TabContent {...props} contractMarketInfo={contractMarketInfo} />
    </TabContainer>
  )
}

TabItem.propTypes = {
  props: PropTypes.object.isRequired,
  TabContent: PropTypes.func,
  isChatTab: PropTypes.bool,
  hideTab: PropTypes.bool,
}

const memberPagePanes = (props) => {
  const memberId = props.match.params.memberId
  const panes = [
    {
      menuItem: 'Member',
      render: () => <TabItem props={props} TabContent={DetailsTab} />,
    },
    {
      menuItem: 'Claims',
      render: () => <TabItem props={{...props, memberId}} TabContent={ClaimsTab} />,
    },
    {
      menuItem: 'Files',
      render: () => <TabItem props={props} TabContent={MemberFile} />,
    },
    {
      menuItem: 'Tickets',
      render: () => (
        <TabItem
          props={{
            ...props,
            memberId,
            ticketType: 'REMIND',
          }}
          TabContent={CreateTicketStandAlone}
        />
      ),
    },
  ]
  panes.push(
    {
      menuItem: 'Contracts',
      render: () => (
        <TabItem props={{ ...props, memberId }} TabContent={ContractTab} />
      ),
    },
    {
      menuItem: 'Quotes',
      render: () => (
        <TabItem props={{ ...props, memberId }} TabContent={Quotes} />
      ),
    },
  )
  panes.push(
    {
      menuItem: 'Payments',
      render: () => (
        <TabItem memberId={memberId} props={props} TabContent={PaymentsTab} />
      ),
    },
    {
      menuItem: 'Account',
      render: () => (
        <TabItem
          memberId={memberId}
          props={{ ...props, memberId }}
          TabContent={AccountTab}
        />
      ),
    },
    {
      menuItem: 'Debt',
      render: () => <TabItem props={props} TabContent={MemberDebtComponent} />,
    },
  )

  return panes
}
export default memberPagePanes
