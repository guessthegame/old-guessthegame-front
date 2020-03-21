import { select, takeEvery, all } from 'redux-saga/effects'
import { getType } from 'typesafe-actions'
import * as actions from './actions'
import { saveUserInLocalStorage, removeUserFromLocalstorage } from '../../../services/localstorage'
import { RootState } from '../../rootReducer'

// logUser

function* logUserWorker() {
  const state: RootState = yield select()

  saveUserInLocalStorage(state.user.user)
}

function* watchLogUserAction() {
  yield takeEvery(getType(actions.logUser), logUserWorker)
}

// logout

function logoutWorker() {
  removeUserFromLocalstorage()
}

function* watchLogoutAction() {
  yield takeEvery(getType(actions.logout), logoutWorker)
}

// All

export default function* sagas() {
  yield all([watchLogUserAction(), watchLogoutAction()])
}
