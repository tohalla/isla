import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../constants';

export default createReducer(fromJS({}), {
  [LOGIN_REQUEST]: (state, action) => {
    return action.auth;
  },
  [LOGIN_SUCCESS]: (state, action) => {
    return action.auth;
  },
  [LOGIN_FAILURE]: (state, action) => {
    return action.auth;
  },
  [LOGOUT_SUCCESS]: () => {
    return fromJS({});
  }
});

export const requestLogin = credentials => {
  return {
    type: LOGIN_REQUEST,
    credentials,
    auth: fromJS({
      isFetching: true,
      isAuthenticated: false
    })
  };
};

export const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    auth: fromJS({
      isFetching: false,
      isAuthenticated: true,
      user
    })
  };
};

export const loginError = () => {
  return {
    type: LOGIN_FAILURE,
    auth: fromJS({
      isFetching: false,
      isAuthenticated: false
    })
  };
};

export const receiveLogout = () => {
  return {type: LOGOUT_SUCCESS};
};
