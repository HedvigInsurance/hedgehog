import Grid from '@material-ui/core/Grid'
import {
  getAnswerQuestionOptions,
  useAnswerQuestion,
} from 'graphql/use-answer-question'
import {
  getMarkQuestionAsResolvedOptions,
  useMarkQuestionAsResolved,
} from 'graphql/use-mark-question-as-resolved'
import { Checkbox } from 'hedvig-ui/checkbox'
import { Form, FormTextArea, SubmitButton } from 'hedvig-ui/form'
import { Spacing } from 'hedvig-ui/spacing'
import React from 'react'
import styled from 'react-emotion'
import { FieldValues, FormProvider, useForm } from 'react-hook-form'
import { WithShowNotification } from 'store/actions/notificationsActions'
import { withShowNotification } from 'utils/notifications'

const MarkAsResolvedWrapper = styled.div`
  padding-left: 1rem;
`

const SubmitButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`

const FlexGrid = styled(Grid)`
  display: flex;
`

export const AnswerFormComponent: React.FC<{
  memberId: string
} & WithShowNotification> = ({ memberId, showNotification }) => {
  const form = useForm()

  const [
    answerQuestion,
    { loading: loadingAnswerQuestion },
  ] = useAnswerQuestion()

  const [
    markQuestionAsResolved,
    { loading: loadingMarkQuestionAsResolved },
  ] = useMarkQuestionAsResolved()

  const loading =
    loadingAnswerQuestion ||
    loadingMarkQuestionAsResolved ||
    form.formState.isSubmitting

  const onSubmit = (data: FieldValues) => {
    answerQuestion(getAnswerQuestionOptions(memberId, data.answer.trim()))
      .then(() => {
        showNotification({
          type: 'olive',
          header: 'Success',
          message: `Successfully sent an answer to ${memberId}`,
        })
      })
      .catch((error) => {
        showNotification({
          type: 'red',
          header: `Unable to send the answer to ${memberId}`,
          message: error.message,
        })
        throw error
      })
  }

  const handleDone = () => {
    markQuestionAsResolved(getMarkQuestionAsResolvedOptions(memberId))
      .then(() => {
        showNotification({
          type: 'olive',
          header: 'Success',
          message: `Successfully marked question as resolved for ${memberId}`,
        })
      })
      .catch((error) => {
        showNotification({
          type: 'red',
          header: `Unable to mark the question as resolved for ${memberId}`,
          message: error.message,
        })
        throw error
      })
  }

  return (
    <>
      <Spacing top="small" bottom="small">
        <FormProvider {...form}>
          <Form onSubmit={onSubmit}>
            <Grid container spacing={24}>
              <Grid item xs={9}>
                <FormTextArea
                  name="answer"
                  defaultValue=""
                  rules={{
                    required: 'Cannot send an empty message',
                    pattern: {
                      value: /[^\s]/,
                      message: 'Cannot send a message without text',
                    },
                  }}
                />
              </Grid>
              <FlexGrid item xs={2}>
                <SubmitButtonWrapper>
                  <SubmitButton variation="primary">Send</SubmitButton>
                </SubmitButtonWrapper>
              </FlexGrid>
            </Grid>
          </Form>
        </FormProvider>
      </Spacing>
      <MarkAsResolvedWrapper>
        <Checkbox
          label="Mark as resolved"
          onClick={() => handleDone()}
          disabled={loading}
        />
      </MarkAsResolvedWrapper>
    </>
  )
}

export const AnswerForm = withShowNotification(AnswerFormComponent)
