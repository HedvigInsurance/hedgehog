import { MonetaryAmountV2 } from 'api/generated/graphql'

type Money =
  | MonetaryAmountV2
  | {
      amount: number
      currency: string
    }

export const formatMoney = (
  { amount, currency }: Money,
  options: Intl.NumberFormatOptions | null = null,
): string =>
  `${
    options ? Number(amount).toLocaleString(undefined, options) : amount
  } ${currency}`

type MaybeMoney =
  | { amount?: string; currency?: string }
  | {
      amount?: number
      currency?: string
    }
  | null
  | undefined

export const formatMoneyMaybe = (
  money: MaybeMoney,
  options: Intl.NumberFormatOptions | null = null,
): string | null => {
  if (!money) {
    return null
  }

  const { amount, currency } = money

  if (!amount || !currency) {
    return null
  }

  if (options) {
    return `${Number(amount).toLocaleString(undefined, options)} ${currency}`
  }

  return `${amount} ${currency}`
}
