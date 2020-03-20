import { all } from 'redux-saga/effects'

import commonSagas from './common/sagas'

export default function* rootSaga() {
  yield all([commonSagas()])
}
