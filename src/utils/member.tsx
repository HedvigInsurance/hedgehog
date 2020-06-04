import { Market } from 'api/generated/graphql'
import { differenceInYears, parse } from 'date-fns'
import { lightTheme } from 'hedvig-ui/themes'
import React from 'react'

export const MemberAge: React.FC<{
  birthDateString: string
}> = ({ birthDateString }) => {
  if (!birthDateString) {
    return null
  }
  let birthDate
  try {
    birthDate = parse(birthDateString, 'yyyy-MM-dd', new Date())
  } catch (e) {
    return null
  }
  const age = differenceInYears(new Date(), birthDate)

  return <>{age} years</>
}

export const isMemberIdEven = (memberId: string) => {
  let isMemberIdEvenReally = false
  try {
    isMemberIdEvenReally = parseInt(memberId, 10) % 2 === 0
  } catch (_) {
    // noop
  }
  return isMemberIdEvenReally
}

const tomasMemberId = 185188729
export const getMemberIdColor = (memberId: string) => {
  if (parseInt(memberId, 10) === tomasMemberId) {
    return '#000'
  }

  if (isMemberIdEven(memberId)) {
    return lightTheme.danger
  }
  return lightTheme.success
}

export const getMemberGroup = (memberId: number) => {
  if (memberId === tomasMemberId) {
    return 'The dark lord Sith'
  }

  if (isMemberIdEven(memberId.toString())) {
    return 'Red team'
  }
  return 'Green team'
}

export const getMemberFlag = (market: Market): string => {
  switch (market) {
    case Market.Norway:
      return '🇳🇴'
    case Market.Sweden:
      return '🇸🇪'
    default:
      return '🏳'
  }
}

const SWEDISH_SSN_LENGTH = 12
const NORWEGIAN_SSN_LENGTH = 11
export const formatSsn = (ssn: string) => {
  if (ssn.length === SWEDISH_SSN_LENGTH) {
    return ssn.slice(0, 8) + '-' + ssn.slice(8, 12)
  }

  if (ssn.length === NORWEGIAN_SSN_LENGTH) {
    return ssn.slice(0, 6) + '-' + ssn.slice(6, 11)
  }

  return ssn
}
