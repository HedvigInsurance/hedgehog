import PropTypes from 'prop-types'
import React from 'react'
import {
  Button,
  Form as StandardForm,
  TextArea,
} from 'semantic-ui-react'
import styled from 'react-emotion'
import { Checkbox } from 'hedvig-ui/checkbox'
import {
  getAnswerQuestionOptions,
  useAnswerQuestion,
} from 'graphql/use-answer-question'
import {
  getMarkQuestionAsResolvedOptions,
  useMarkQuestionAsResolved,
} from 'graphql/use-mark-question-as-resolved'

const Form = styled(StandardForm)`
  max-width: 35rem !important;
  padding-left: calc(1.5rem + 7px);
`

const FormGroup = styled(StandardForm.Group)`
  &&& {
    display: flex;
    align-items: flex-end;
    width: 100%;
    margin-top: 10px;
    padding-top: 2rem;
  }
`

const FormTextArea = styled(StandardForm.Field)`
  &&& {
    width: 100%;
  }
`

const MarkAsResolvedWrapper = styled('div')`
  padding-left: 1rem;
`

export const AnswerForm = ({ memberId }) => {
  const [answer, setAnswer] = React.useState('')

  const [
    answerQuestion,
    { loading: loadingAnswerQuestion },
  ] = useAnswerQuestion()

  const [
    markQuestionAsResolved,
    { loading: loadingMarkQuestionAsResolved },
  ] = useMarkQuestionAsResolved()

  const loading = loadingAnswerQuestion || loadingMarkQuestionAsResolved

  const answerChangeHandler = (e, { value }) => {
    setAnswer(value)
  }

  const answerClick = () => {
    if (answer.trim().length) {
      answerQuestion(getAnswerQuestionOptions(memberId, answer.trim()))
    }
  }

  const doneClick = () => {
    markQuestionAsResolved(getMarkQuestionAsResolvedOptions(memberId))
  }

  return (
    <>
      <Form>
        <FormGroup>
          <FormTextArea
            control={TextArea}
            placeholder="Write reply..."
            onChange={answerChangeHandler}
            value={answer}
            rows={1}
          />
          <div>
            <Button
              content="Send"
              onClick={() => answerClick()}
              primary
              disabled={loading || !answer.trim().length}
            />
          </div>
        </FormGroup>
        <MarkAsResolvedWrapper>
          <Checkbox
            label="Mark as resolved"
            onClick={() => doneClick()}
            disabled={loading}
          />
        </MarkAsResolvedWrapper>
      </Form>
    </>
  )
}

AnswerForm.propTypes = {
  memberId: PropTypes.string.isRequired,
}
