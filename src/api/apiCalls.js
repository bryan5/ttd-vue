import axios from 'axios';
import i18n from '../locales/i18n';

axios.interceptors.request.use((request) => {
  request.headers['Accept-Language'] = i18n.global.locale;
  return request;
});

export const signUp = (body) => {
  return axios.post('/api/1.0/users', body);
}

export const activate = (token) => {
  return axios.post('/api/1.0/users/token/' + token);
}

export const loadUsers = (page) => {
  return axios.get('/api/1.0/users', {
    params: {
      page,
      size: 3,
    },
  });
};

export const getUserById = (id) => {
  return axios.get('/api/1.0/users/' + id);
};

export const login = (creds) => {
  return axios.post('/api/1.0/auth', creds);
}
