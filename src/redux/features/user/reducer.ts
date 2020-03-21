import * as actions from './actions'
import { ActionType, getType } from 'typesafe-actions'
import User from './models/User'
import { loadUserFromLocalStorage, saveUserInLocalStorage } from '../../../services/localstorage'

export type UserAction = ActionType<typeof actions>

export type UserState = {
  user: User
}
const initialState = {
  user: {
    jwt: null,
    username: null,
    canModerateScreenshots: false,
    lastViewedRandomScreenshots: [],
  },
}

export default (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case getType(actions.loadUser):
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      }

    case getType(actions.logUser):
      return {
        ...state,
        user: {
          ...state.user,
          jwt: action.payload.jwt,
          username: action.payload.username,
          canModerateScreenshots: action.payload.canModerateScreenshots,
        },
      }

    case getType(actions.logout):
      return {
        ...state,
        user: initialState.user,
      }

    default:
      return state
  }
}
