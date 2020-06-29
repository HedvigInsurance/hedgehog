import api from 'api'
import config from 'api/config'
import { AxiosResponse } from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import * as actions from '../actions/claimsActions'
import { showNotification } from '../actions/notificationsActions'
import {
  CLAIM_TYPES,
  CLAIM_UPDATING,
  CLAIMS_BY_MEMBER,
  CLAIMS_REQUESTING,
} from '../constants/claims'

function* requestFlow({ searchFilter }) {
  try {
    const { data } = yield call(
      api,
      config.claims.search,
      null,
      null,
      searchFilter,
    )
    yield put(actions.claimsRequestSuccess(data))
  } catch (error) {
    yield [
      put(showNotification({ message: error.message, header: 'Claims' })),
      put(actions.claimsError(error)),
    ]
  }
}

function* requestByMemberFlow({ id }) {
  try {
    const { data } = yield call(api, config.claims.getListByMemberId, null, id)
    yield put(actions.claimsByMemberSuccess(data))
  } catch (error) {
    yield [
      put(showNotification({ message: error.message, header: 'Claims' })),
      put(actions.claimsError(error)),
    ]
  }
}

function* updateFlow({ data, id, reqType }) {
  try {
    const path = `${id}/${reqType}`
    yield call(api, config.claims.update, { id, ...data }, path)
    yield put(actions.claimUpdateSuccess(reqType, data))
  } catch (error) {
    yield [
      put(showNotification({ message: error.message, header: 'Claims' })),
      put(actions.claimsError(error)),
    ]
  }
}

function* claimTypesFlow() {
  try {
    const { data } = yield call(api, config.claims.types)
    yield put(actions.claimsTypesSuccess(data))
  } catch (error) {
    yield [
      put(showNotification({ message: error.message, header: 'Claims' })),
      put(actions.claimsError(error)),
    ]
  }
}

function* claimsWatcher() {
  yield [
    takeLatest(CLAIMS_REQUESTING, requestFlow),
    takeLatest(CLAIM_UPDATING, updateFlow),
    takeLatest(CLAIM_TYPES, claimTypesFlow),
    takeLatest(CLAIMS_BY_MEMBER, requestByMemberFlow),
  ]
}

export default claimsWatcher
