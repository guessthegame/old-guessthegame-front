import axios from 'axios';
import { apiUrl } from '../config';
import store from '../store';

const api = axios.create({
  baseURL: `${apiUrl}/api`,
});

export default {
  get,
  post,
  native: api,
};

function get(url) {
  return api.get(url).then(res => res.data.result);
}

function post(url, data, conf) {
  const dataWithJwt = addJwt(data);
  return api
    .post(url, dataWithJwt, conf)
    .then(res => res.data.result, err => err.response.data);
}

function addJwt(data) {
  if (data instanceof FormData) {
    return data;
  }
  const state = store.getState();
  return {
    jwt: state.user && state.user.jwt,
    ...data,
  };
}
