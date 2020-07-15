import AuthSaga from './authSaga'
import ClaimDetailsSaga from './claimDetailsSaga'
import ClaimsSaga from './claimsSaga'
import MembersSaga from './membersSaga'
import MessagesSaga from './messagesSaga'
import NotesSaga from './notesSaga'
import PaymentsSaga from './paymentsSaga'
import PayoutSaga from './payoutSaga'
import PollingSaga from './pollingSaga'
import QuestionsSaga from './questionsSaga'

export default function* IndexSaga() {
  yield [
    AuthSaga(),
    PollingSaga(),
    MembersSaga(),
    MessagesSaga(),
    ClaimsSaga(),
    ClaimDetailsSaga(),
    PaymentsSaga(),
    PayoutSaga(),
    NotesSaga(),
    QuestionsSaga(),
  ]
}
