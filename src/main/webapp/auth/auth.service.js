import fetch from 'isomorphic-fetch';
import config from '../config';

import {
  requestLogin,
  receiveLogin,
  loginError,
  receiveLogout
} from './auth';

export const login = credentials => {
  return dispatch => {
    dispatch(requestLogin());
    let body = 'j_username=' + encodeURIComponent(credentials.username) +
      '&j_password=' + encodeURIComponent(credentials.password) +
      '&remember-me=false&submit=Login';
    return fetch(`http://${config.api.host}:${config.api.port}/api/authentication`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject('authentication error');
        }
        return fetch(`http://${config.api.host}:${config.api.port}/api/account`)
          .then(response => {
            console.log(response);
            return response.text();
          })
          .then(response => {
            console.log(response);
          });
        // localStorage.setItem('token', json.token);
        // dispatch(receiveLogin(json.user));
      })
      .catch(err => dispatch(loginError(err)));
  };
};

export const getUser = () => {
  return dispatch => {
    fetch(`http://${config.api.host}:${config.api.port}/api/authentication`, {
      headers: {
        Accept: 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => dispatch(receiveLogin(json)))
      .catch(err => console.log(err));
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('token');
    dispatch(receiveLogout());
  };
};
