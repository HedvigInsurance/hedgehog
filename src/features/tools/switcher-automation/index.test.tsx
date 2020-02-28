import { MockedProvider } from '@apollo/react-testing'
import {
  GetSwitcherEmailsDocument,
  MarkSwitcherEmailAsRemindedDocument,
  Member,
} from 'api/generated/graphql'
import { subDays } from 'date-fns'
import { mount } from 'enzyme'
import { Button } from 'hedvig-ui/button'
import * as React from 'react'
import { act } from 'react-dom/test-utils'
import { StaticRouter } from 'react-router'
import { Table } from 'semantic-ui-react'
import { sleep } from 'utils/sleep'
import {
  shouldHighlight,
  shouldMute,
  SwitcherAutomation,
  SwitcherEmailRow,
} from './index'

it('checks dates correctly for highlighting', () => {
  expect(shouldHighlight(null, null)).toBe(false)
  expect(shouldHighlight(subDays(new Date(), 8), null)).toBe(true)
  expect(shouldHighlight(subDays(new Date(), 8), subDays(new Date(), 2))).toBe(
    false,
  )
  expect(shouldHighlight(subDays(new Date(), 8), subDays(new Date(), 8))).toBe(
    true,
  )

  expect(shouldMute(null, null)).toBe(false)
  expect(shouldMute(new Date(), null)).toBe(true)
  expect(shouldMute(subDays(new Date(), 8), subDays(new Date(), 4))).toBe(false)
  expect(shouldMute(subDays(new Date(), 2), subDays(new Date(), 2))).toBe(true)
})

it('renders without 💥', async () => {
  const switchableSwitcherEmails = [
    {
      __typename: 'SwitchableSwitcherEmail',
      id: '40ad4740-2b87-462e-89b4-8314eefdb96d',
      member: {
        __typename: 'Member',
        memberId: '123456',
        signedOn: '2019-03-18T14:28:20.281363Z',
        firstName: 'Blargh',
        lastName: 'Blarghson',
      },
      switcherCompany: 'FOLKSAM',
      queuedAt: '2020-01-21T10:05:39.041015Z',
      sentAt: '2020-01-21T10:16:01.580173Z',
      remindedAt: null,
    },
    {
      __typename: 'SwitchableSwitcherEmail',
      id: '6e61bfcd-235b-425e-8183-40b483027c44',
      member: {
        __typename: 'Member',
        memberId: '654321',
        signedOn: '2019-03-18T14:28:20.281363Z',
        firstName: 'Blargus',
        lastName: 'Blargisus',
      },
      switcherCompany: 'FOLKSAM',
      queuedAt: '2020-02-21T10:22:01.970136Z',
      sentAt: '2020-02-21T10:24:46.800335Z',
      remindedAt: null,
    },
    {
      __typename: 'SwitchableSwitcherEmail',
      id: '6e61bfcd-235b-425e-8183-40b483027c45',
      member: {
        __typename: 'Member',
        memberId: '321456',
        signedOn: '2019-03-18T14:28:20.281363Z',
        firstName: 'Blargidora',
        lastName: 'Blargasus',
      },
      switcherCompany: 'FOLKSAM',
      queuedAt: '2020-01-21T10:22:01.970136Z',
      sentAt: '2020-01-21T10:24:46.800335Z',
      remindedAt: '2020-02-21T10:24:46.800335Z',
    },
  ]
  const wrapper = mount(
    <StaticRouter location="/tools/switcher-automation" context={{}}>
      <MockedProvider
        mocks={[
          {
            request: {
              query: GetSwitcherEmailsDocument,
            },
            result: {
              data: {
                switchableSwitcherEmails,
              },
            },
          },
        ]}
      >
        <SwitcherAutomation />
      </MockedProvider>
    </StaticRouter>,
  )

  await act(() => sleep(0))
  wrapper.update()

  expect(wrapper.find('SwitcherEmailRow').length).toBe(3)
  expect(wrapper.find(Button).length).toBe(2) // 2 remindable
})

it('marks rows as reminded', async () => {
  const emailId = '40ad4740-2b87-462e-89b4-8314eefdb96d'
  let remindCalled: boolean = false
  ;(global as any).confirm = jest.fn(() => true)

  const wrapper = mount(
    <StaticRouter location="/tools/switcher-automation" context={{}}>
      <MockedProvider
        mocks={[
          {
            request: {
              query: MarkSwitcherEmailAsRemindedDocument,
              variables: { id: emailId },
            },
            result: () => {
              remindCalled = true
              return { data: { markSwitchableSwitcherEmailAsReminded: true } }
            },
          },
          {
            request: { query: GetSwitcherEmailsDocument },
            result: { data: { switchableSwitcherEmails: [] } },
          },
        ]}
      >
        <Table>
          <Table.Body>
            <SwitcherEmailRow
              id={emailId}
              member={
                {
                  memberId: '123456',
                  firstName: 'Blargh',
                  lastName: 'Blarghson',
                  signedOn: '2019-03-18T14:28:20.281363Z',
                } as Member // tslint:disable-line
              }
              switcherCompany="FOLKSAM"
              sentAt="2020-01-21T10:16:01.580173Z"
              remindedAt={null}
            />
          </Table.Body>
        </Table>
      </MockedProvider>
    </StaticRouter>,
  )

  expect(wrapper.find(Button).length).toBe(1)
  wrapper.find(Button).simulate('click')
  expect(wrapper.find(Button).text()).toBe('...')
  await act(() => sleep(0))
  expect(remindCalled).toBe(true)
})
