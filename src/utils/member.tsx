import { colorsV2 } from '@hedviginsurance/brand'
import { differenceInYears, parse } from 'date-fns'
import React from 'react'
import styled from 'react-emotion'
import { Gender } from 'store/storeTypes'

const OLD_MAN = '👴🏼'
const MIDDLE_AGED_MAN = '👱🏼‍♂️'
const YOUNG_MAN = '🧑🏽'
const REALLY_YOUNG_MAN = '🧒🏻'
const BABY = '👶🏻'

const OLD_WOMAN = '👵🏾'
const MIDDLE_AGED_WOMAN = '👱🏼‍♀️️'
const YOUNG_WOMAN = '👩🏾'
const REALLY_YOUNG_WOMAN = '👧🏼'

const EmojiWrapper = styled('span')({
  fontSize: '1.5em',
  verticalAlign: 'text-bottom',
})

export const MemberEmoji: React.FC<{
  birthDateString: string
  gender: Gender
}> = ({ birthDateString, gender }) => {
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

  return (
    <>
      &nbsp; ({age} years) &nbsp;
      <EmojiWrapper>
        {(() => {
          if (gender === 'MALE') {
            switch (true) {
              case age < 20:
                return BABY
              case age < 25:
                return REALLY_YOUNG_MAN
              case age < 30:
                return YOUNG_MAN
              case age < 50:
                return MIDDLE_AGED_MAN
              default:
                return OLD_MAN
            }
          }

          if (gender === 'FEMALE') {
            switch (true) {
              case age < 20:
                return BABY
              case age < 25:
                return REALLY_YOUNG_WOMAN
              case age < 30:
                return YOUNG_WOMAN
              case age < 50:
                return MIDDLE_AGED_WOMAN
              default:
                return OLD_WOMAN
            }
          }

          return '🐺'
        })()}
      </EmojiWrapper>
      &nbsp;
    </>
  )
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

export const getMemberIdColor = (memberId: string) =>
  isMemberIdEven(memberId) ? colorsV2.midnight500 : colorsV2.grass300
