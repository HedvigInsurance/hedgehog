import { useCreatePaymentCompletionLinkMutation } from 'api/generated/graphql'
import copy from 'copy-to-clipboard'
import { Button } from 'hedvig-ui/button'
import { Card, CardsWrapper } from 'hedvig-ui/card'
import { Popover } from 'hedvig-ui/popover'
import { Spacing } from 'hedvig-ui/spacing'
import { ThirdLevelHeadline } from 'hedvig-ui/typography'
import React, { useState } from 'react'
import styled, { css } from 'react-emotion'
import { WithShowNotification } from 'store/actions/notificationsActions'

const ActualLink = styled('a')`
  white-space: pre-wrap;

  &&:hover,
  &&:focus {
    ${({ theme }) => css`
      color: ${theme.accent};
      text-decoration: none;
    `}
  }
`

export const GenerateSetupDirectDebitLink: React.FC<{
  memberId: string
} & WithShowNotification> = ({ memberId }) => {
  const [
    createPaymentCompletionLink,
    { data, loading },
  ] = useCreatePaymentCompletionLinkMutation({
    variables: { memberId },
  })
  const [isCopied, setIsCopied] = useState(false)

  return (
    <>
      <Button
        onClick={(e) => {
          e.preventDefault()
          createPaymentCompletionLink()
        }}
        loading={loading}
      >
        Generate payments link
      </Button>
      {data?.createPaymentCompletionLink?.url && (
        <Spacing top>
          <CardsWrapper>
            <Card>
              <ThirdLevelHeadline>Payments link</ThirdLevelHeadline>
              <Popover
                disable={isCopied}
                onClose={() => {
                  setIsCopied(false)
                }}
                contents={<>Click to copy link</>}
              >
                <ActualLink
                  onClick={(e) => {
                    e.preventDefault()
                    copy(data.createPaymentCompletionLink.url, {
                      format: 'text/plain',
                    })
                    setIsCopied(true)
                  }}
                  href={data.createPaymentCompletionLink.url}
                >
                  {data.createPaymentCompletionLink.url}
                </ActualLink>
              </Popover>
            </Card>
          </CardsWrapper>
        </Spacing>
      )}
    </>
  )
}
