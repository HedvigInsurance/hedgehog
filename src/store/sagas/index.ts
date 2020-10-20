import AuthSaga from './authSaga'
import ClaimsSaga from './claimsSaga'
import PayoutSaga from './payoutSaga'

export default function* IndexSaga() {
  yield [AuthSaga(), ClaimsSaga(), PayoutSaga()]
}
