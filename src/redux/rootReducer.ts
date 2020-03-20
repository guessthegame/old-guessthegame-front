import { StateType } from 'typesafe-actions'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({})

export type RootState = StateType<ReturnType<typeof rootReducer>>

export default rootReducer
