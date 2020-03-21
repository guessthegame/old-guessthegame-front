import { createAction } from 'typesafe-actions'
import { UserLoginResponse } from '../../../services/api/user/login'
import User from './models/User'

export const loadUser = createAction('user/LOAD_USER')<User>()

export const logUser = createAction('user/LOG_USER')<UserLoginResponse>()

export const logout = createAction('user/LOGOUT')<undefined>()
