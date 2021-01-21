import api from 'api'
import config from 'api/config'
import { call, put, takeLatest } from 'redux-saga/effects'
import { setClient, unsetClient } from '../actions/clientActions'
import { CLIENT_CHECK_AUTH } from '../constants/login'

function* requestFlow() {
  try {
    const { data } = yield call(api, config.login.login)
    yield put(setClient(data))
  } catch (error) {
    yield put(unsetClient())
  }
}

function* clientWatcher() {
  yield [takeLatest(CLIENT_CHECK_AUTH, requestFlow)]
}

export default clientWatcher
