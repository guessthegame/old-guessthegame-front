import { post, ApiResponse } from '../api'

export type UserLoginErrorCodes = 'LOGIN_USER_NOT_FOUND' | 'LOGIN_INCORRECT_PASSWORD'

export interface UserLoginRequest {
  username: string
  password: string
}

export interface UserLoginResponse extends ApiResponse {
  jwt: string
  username: string
  canModerateScreenshots: boolean
  error: {
    code: UserLoginErrorCodes
    message: string
  }
}

export async function login(data: UserLoginRequest): Promise<UserLoginResponse> {
  return post('/user/login', data)
}
