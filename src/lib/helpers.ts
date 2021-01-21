// @ts-nocheck
import { parseISO } from 'date-fns'
import formatDate from 'date-fns/format'

export const sortByKey = (key: string) => (a, b) => a[key] - b[key]

export const updateList = (list: any[], msg: any[]) => {
  if (msg.length > 1) {
    return [...list, ...msg].sort(sortByKey('globalId'))
  } else {
    const result = list.slice()
    const updatedMessage = result.find((item, id) => {
      if (item.globalId === msg[0].globalId) {
        list[id] = { ...msg[0] }
      }
    })
    if (!updatedMessage) {
      return [...result, ...msg]
    }
    return [...result]
  }
}

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Returns string splitted by words
 * @param {string} field
 * @example 'memberFirstName' -> 'Member first name'
 */
export const getFieldName = (field) =>
  capitalize(
    field
      .match(/([A-Z]?[^A-Z]*)/g)
      .slice(0, -1)
      .join(' '),
  )

export const getFieldValue = (value) => {
  if (!value) {
    return ''
  }
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  if (value && typeof value === 'object' && value.constructor === Object) {
    return Object.keys(value).map((key) => `${key}: ${value[key]}, `)
  }
  return value.toString()
}

/**
 * Sort claims table (ClaimsList page)
 * @param {array} list ClaimsList
 * @param {string} fieldName clicked column name
 * @param {bool} isReverse
 */
export const sortClaimsList = (list, fieldName, isReverse) => {
  let sortedList = null

  switch (fieldName) {
    case 'type':
    case 'state':
      return sortListByText(list, fieldName, isReverse)
    case 'reserve':
      return sortListByNumber(list, fieldName, isReverse)
    case 'date':
      return sortListByDate(list, fieldName, isReverse)
    default:
      sortedList = list
  }
  return isReverse ? (sortedList ?? []).reverse() : sortedList
}

export const range = (start, end) =>
  start >= 0 && end >= start
    ? Array.from({ length: end - start }, (v, k) => k + start)
    : []

function sortListByText(list, fieldName, isReverse) {
  const withoutText: any[] = []

  const withText = list.filter((item) => {
    if (!item[fieldName]) {
      withoutText.push(item)
    }
    return !!item[fieldName]
  })

  const sortedTexts = withText.sort((a, b) => {
    return a[fieldName].toUpperCase() > b[fieldName].toUpperCase()
      ? 1
      : a[fieldName].toUpperCase() < b[fieldName].toUpperCase()
      ? -1
      : 0
  })
  const resultList = isReverse ? sortedTexts.reverse() : sortedTexts
  return [...resultList, ...withoutText]
}

function sortListByNumber(list, fieldName, isReverse) {
  const withoutNumbers: any[] = []

  const withNumbers = list.filter((item) => {
    if (!item[fieldName] || isNaN(item[fieldName])) {
      withoutNumbers.push(item)
    }
    return !!item[fieldName]
  })

  const sortedNumbers = withNumbers.sort((a, b) => {
    return a > b
  })
  const resultList = isReverse ? sortedNumbers.reverse() : sortedNumbers
  return [...resultList, ...withoutNumbers]
}

function sortListByDate(list, fieldName, isReverse) {
  const withoutDates: any[] = []

  const withDates = list.filter((item) => {
    if (!item[fieldName]) {
      withoutDates.push(item)
    }
    return !!item[fieldName]
  })

  const sortedDates = withDates.sort((a, b) => {
    return a - b
  })
  const resultList = isReverse ? sortedDates.reverse() : sortedDates
  return [...resultList, ...withoutDates]
}

export const dateTimeFormatter = (date: string | number, format: string) => {
  try {
    return (
      date &&
      formatDate(typeof date === 'string' ? parseISO(date) : date, format)
    )
  } catch (e) {
    console.error(e)
    return undefined
  }
}

export interface MonetaryAmount {
  amount: string
  currency: string
}
