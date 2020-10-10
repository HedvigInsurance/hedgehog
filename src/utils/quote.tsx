import { Quote } from 'api/generated/graphql'
import React from 'react'
import {
  convertCamelcaseToTitle,
  convertEnumOrSentenceToTitle,
} from 'utils/text'

export const isSignedOrExpired = (quote: Quote) =>
  isExpired(quote) || isSigned(quote)

export const isExpired = (quote: Quote) => {
  const createdAt = new Date(quote.createdAt)
  const now = new Date()

  const thirtyDaysInSeconds = 30 * 24 * 3600
  const validityInSeconds = quote.validity ?? thirtyDaysInSeconds
  const validUntil = new Date(createdAt.getTime() + validityInSeconds * 1000)

  return now > validUntil
}

export const isSigned = (quote: Quote) => quote.state === 'SIGNED'

export const getSchemaDataInfo: React.FC<{
  schemaData: Record<string, unknown>
}> = ({ schemaData }) => {
  return (
    <>
      {Object.entries(schemaData)
        .filter((entry) => entry[0] !== 'id' && entry[1] !== null)
        .map((entry) => {
          const [key, value] = entry
          const valueMessage = valueToMessage(value)
          return (
            <p>
              <strong>{convertCamelcaseToTitle(key)}:</strong>{' '}
              {valueMessage && convertEnumOrSentenceToTitle(valueMessage)}
            </p>
          )
        })}
    </>
  )
}

const valueToMessage = (value: unknown): string | null => {
  switch (typeof value) {
    case 'boolean':
      return value ? 'Yes' : 'No'
    case 'number':
    case 'string':
      return value.toString()
    case 'object':
      if (Array.isArray(value)) {
        return value.length.toString()
      }
      return null
    default:
      return null
  }
}
