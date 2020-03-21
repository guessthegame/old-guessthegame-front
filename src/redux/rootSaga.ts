import { all } from 'redux-saga/effects'

import commonSagas from './common/sagas'
import userSagas from './features/user/sagas'

export default function* rootSaga() {
  yield all([commonSagas(), userSagas()])
}
