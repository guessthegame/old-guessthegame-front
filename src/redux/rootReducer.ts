import { StateType } from 'typesafe-actions'
import { combineReducers } from 'redux'

import userReducer from './features/user/reducer'

const rootReducer = combineReducers({
  user: userReducer,
})

export type RootState = StateType<ReturnType<typeof rootReducer>>

export default rootReducer
