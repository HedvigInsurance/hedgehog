import Questions from 'components/questions'
import { ListPage } from 'components/shared'
import React from 'react'
import { withRouter } from 'react-router'

const QuestionsPage = () => (
  <ListPage>
    <Questions />
  </ListPage>
)

export default withRouter(QuestionsPage)
