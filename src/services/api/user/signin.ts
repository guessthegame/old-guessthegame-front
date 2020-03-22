import { post, ApiResponse, postWithJwt } from '../api'
import EmailUpdateFrequency from '../../../models/user/EmailUpdateFrequency'

export type UserSigninErrorCode = 'RECAPTCHA_ERROR'

export interface UserSigninRequest {
  username: string
  email: string
  password: string
  emailUpdates: EmailUpdateFrequency
  recaptchaToken: string
}

export interface UserSigninResponse extends ApiResponse {
  jwt: string
  username: string
  canModerateScreenshots: boolean
  error: {
    code: UserSigninErrorCode
    message: string
  }
}

export async function signin(data: UserSigninRequest): Promise<UserSigninResponse> {
  return postWithJwt('/user/register', data)
}

export async function checkUsernameAvailabilty(username: string): Promise<boolean> {
  const result = await post('/user/check-username-availability', { username })
  return result.isFree
}

export async function checkEmailAvailabilty(email: string): Promise<boolean> {
  const result = await post('/user/check-email-availability', { email })
  return result.isFree
}
