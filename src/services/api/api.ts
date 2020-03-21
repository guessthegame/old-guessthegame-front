import axios from 'axios'
import store from '../../redux/store'

export interface ApiResponse {
  error?: {
    code: string
    message: string
  }
}

export const api = axios.create({
  baseURL: `${process.env.API_URL}/api`,
})

export async function get(url: string) {
  try {
    const res = await api.get(url)
    return res.data.result
  } catch (error) {
    return {
      error: {
        message: error.message,
        ...error.response.data,
      },
    }
  }
}

export async function post(url: string, data: {}, conf?: {}) {
  try {
    const res = await api.post(url, data, conf)
    return res.data.result
  } catch (error) {
    return {
      error: {
        message: error.message,
        ...error.response.data,
      },
    }
  }
}

export async function postWithJwt(url: string, data: {}, conf?: {}) {
  const state = store.getState()
  const dataWithJwt = {
    jwt: state.user && state.user.user && state.user.user.jwt,
    ...data,
  }
  return post(url, dataWithJwt, conf)
}
