import { isAfter, isValid, parseISO } from 'date-fns'

export const isValidDate = (date?: string) =>
  !!date &&
  (date === ''
    ? true
    : isValid(parseISO(date)) && !isAfter(parseISO(date), new Date()))

export const isValidNumber = (n?: string) => (n ? /^[0-9]*$/g.test(n) : false)

export const isEmpty = (s: string | null) => s === '' || s === null
