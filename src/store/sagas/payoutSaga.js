import api from 'api'
import config from 'api/config'
import { call, put, takeLatest } from 'redux-saga/effects'
import { showNotification } from 'store/actions/notificationsActions'
import * as actions from '../actions/payoutDetailsActions'
import { PAYOUT_REQUESTING } from '../constants/payout'

function* createPayout({ data, memberId }) {
  try {
    const requestBody = {
      amount: {
        amount: data.amount,
        currency: 'SEK',
      },
      category: data.category,
      referenceId: data.referenceId,
      note: data.note,
    }

    yield call(api, config.payout.create, { ...requestBody }, memberId)

    yield [
      put(actions.payoutRequestSuccess()),
      put(
        showNotification({
          message: 'Payout successful!',
          header: 'Payout',
          type: 'olive',
        }),
      ),
    ]
  } catch (error) {
    yield [
      put(actions.payoutRequestError(error)),
      put(showNotification({ message: error.message, header: 'Payout' })),
    ]
  }
}

function* watcher() {
  yield [takeLatest(PAYOUT_REQUESTING, createPayout)]
}

export default watcher
