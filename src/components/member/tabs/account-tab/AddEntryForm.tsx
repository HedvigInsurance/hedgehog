import {
  AccountEntryInput,
  useAddAccountEntryToMemberMutation,
} from 'api/generated/graphql'
import { AddEntryInformation } from 'components/member/tabs/account-tab/AddEntryInformation'
import { format } from 'date-fns'
import { useContractMarketInfo } from 'graphql/use-get-member-contract-market-info'
import { StandaloneMessage } from 'hedvig-ui/animations/standalone-message'
import { Form, FormDropdown, FormInput, SubmitButton } from 'hedvig-ui/form'
import { Spacing } from 'hedvig-ui/spacing'
import React from 'react'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { WithShowNotification } from 'store/actions/notificationsActions'
import { withShowNotification } from 'utils/notifications'

const entryTypeOptions = [
  {
    key: 1,
    value: 'CAMPAIGN',
    text:
      'Campaign: The member owes or will owe us money, but we want to pay for it with marketing budget',
  },
  {
    key: 2,
    value: 'SUBSCRIPTION',
    text:
      'Subscription: The member owes us more money (e.g. object, travel, error)',
  },
  {
    key: 3,
    value: 'LOSS',
    text:
      'Loss: The member owes us money we will never get (e.g. the member terminated its insurance or we had a too early start date)',
  },
  {
    key: 4,
    value: 'CORRECTION',
    text:
      'Correction: A calculation is incorrect (should hopefully never have to be used)',
  },
]

const sourceOptions = [
  {
    key: 1,
    value: 'manual_object',
    text: 'Object Insurance',
  },
  {
    key: 2,
    value: 'manual_travel',
    text: 'Travel Insurance',
  },
  {
    key: 3,
    value: 'manual_growth_discount_correction',
    text: 'Discount code issues (e.g. missing free month, wrong code etc.)',
  },
  {
    key: 4,
    value: 'manual_growth_discount',
    text: 'Growth discount (e.g. Benify, Studentkortet, Mecenat)',
  },
  {
    key: 5,
    value: 'manual_iex_discount',
    text:
      'IEX discount (e.g. Start date issues, Technical issues, "Plåster på såren")',
  },
  {
    key: 6,
    value: 'manual_calculation_correction',
    text: 'Correction of calculation error',
  },
  {
    key: 7,
    value: 'manual_automation_correction',
    text: 'Manual correction of automatic payments calculation error',
  },
  {
    key: 8,
    value: 'other',
    text: 'Other',
  },
]

const AddEntryFormComponent: React.FC<{
  memberId: string
} & WithShowNotification> = ({ memberId, showNotification }) => {
  const [contractMarketInfo] = useContractMarketInfo(memberId)

  if (!contractMarketInfo?.preferredCurrency) {
    return (
      <StandaloneMessage>
        The member has no preferred currency
      </StandaloneMessage>
    )
  }

  const preferredCurrency = contractMarketInfo.preferredCurrency
  const [addAccountEntry] = useAddAccountEntryToMemberMutation()

  const form = useForm()

  const onSubmit = (data: FieldValues) => {
    if (!window.confirm('Are you sure you want to add this entry?')) {
      return
    }

    const dataCopy = { ...data }
    dataCopy.amount = { ...dataCopy.amount, currency: preferredCurrency }
    dataCopy.fromDate = format(new Date(), 'yyyy-MM-dd')
    addAccountEntry({
      variables: {
        memberId,
        accountEntry: dataCopy as AccountEntryInput,
      },
    })
      .then(() => {
        showNotification({
          header: 'Success',
          message: 'Account entry added.',
          type: 'olive',
        })
        form.reset()
      })
      .catch((error) => {
        showNotification({
          header: 'Error',
          message: error.message,
          type: 'red',
        })

        throw error
      })
  }

  return (
    <FormProvider {...form}>
      <Form onSubmit={onSubmit}>
        <FormDropdown
          label="Entry Type"
          options={entryTypeOptions}
          name="type"
          defaultValue=""
          rules={{
            required: 'Type is required',
          }}
        />
        <FormInput
          label="Amount (If positive the member will be charged more, if negative the member will be charged less)"
          name="amount.amount"
          defaultValue=""
          type="number"
          affix={{
            content: preferredCurrency,
            basic: true,
          }}
          affixPosition="right"
          rules={{
            required: 'Amount is required',
            pattern: {
              value: /[^0]/,
              message: 'Amount cannot be zero',
            },
          }}
        />
        <FormDropdown
          label="Source"
          options={sourceOptions}
          name="source"
          defaultValue=""
          rules={{
            required: 'Source is required',
            pattern: {
              value: /[^other$]/,
              message:
                "Other should not be used. Please contact Elvin to add the option you are looking for (he promises he'll be fast)",
            },
          }}
        />
        <FormInput
          label="Reference (Reference of source, e.g. object insurance id, campaign code (BENIFY, SPRING etc.), travel insurance destination)"
          name="reference"
          defaultValue=""
          rules={{
            required: 'Reference is required',
            maxLength: {
              value: 50,
              message: 'The reference is too long (max 50 characters)',
            },
          }}
        />
        <FormInput
          label="Title (If this is to be shown in the app at a later point, this is the title of the entry)"
          name="title"
          defaultValue=""
          rules={{
            maxLength: {
              value: 100,
              message: 'The title is too long (max 100 characters)',
            },
          }}
        />
        <FormInput
          label="Comment (Notes on what happened)"
          name="comment"
          defaultValue=""
        />
        <Spacing bottom="small">
          <AddEntryInformation
            amount={{
              amount: form.watch('amount.amount'),
              currency: preferredCurrency,
            }}
          />
        </Spacing>
        <SubmitButton variation="primary">Add entry</SubmitButton>
      </Form>
    </FormProvider>
  )
}

export const AddEntryForm = withShowNotification(AddEntryFormComponent)
