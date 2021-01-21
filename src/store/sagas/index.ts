import AuthSaga from './authSaga'
import PayoutSaga from './payoutSaga'

export default function* IndexSaga() {
  yield [AuthSaga(), PayoutSaga()]
}
