import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  CALL_API,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  ACCOUNT_REQUEST,
  ACCOUNT_SET,
  ACCOUNT_FAILURE,
  ERROR_AUTH_CLEAR
} from '../constants';

export default createReducer(
  fromJS({
    isFetching: false,
    isAuthenticated: false
  }), {
    [LOGIN_FAILURE]: (state, action) =>
      state.merge(
        {isFetching: false, isAuthenticated: false},
        {error: action.response}
      ),
    [ACCOUNT_SET]: (state, action) => fromJS({
      isFetching: false,
      isAuthenticated: action.response.get('activated')
    }).set('user', action.response),
    [ACCOUNT_FAILURE]: (state, action) =>
      state.merge({isFetching: false}, action.response),
    [LOGOUT_FAILURE]: (state, action) =>
      state.merge({isFetching: false}, action.response),
    [REGISTER_FAILURE]: (state, action) =>
      state.merge({isFetching: false}, action.response),
    [ERROR_AUTH_CLEAR]: state => state.delete('error')
  }
);

export const fetchAccount = () => {
  return {
    [CALL_API]: {
      types: [ACCOUNT_REQUEST, ACCOUNT_SET, ACCOUNT_FAILURE],
      endpoint: 'account',
      config: {
        onSuccess: data => {
          if (!localStorage.token) {
            localStorage.setItem('token', data.login);
          }
        }
      }
    }
  };
};

export const login = credentials => dispatch => dispatch({
  [CALL_API]: {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    endpoint: 'authentication',
    config: {
      body:
        `j_username=${encodeURIComponent(credentials.login)}` +
        `&j_password=${encodeURIComponent(credentials.password)}` +
        `&remember-me=false&submit=Login`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      onSuccess: data => {
        localStorage.setItem('token', `Bearer ${data.token}`);
        return dispatch(fetchAccount());
      },
      onFailure: error => Promise.reject(error)
    }
  }
});

export const register = user => {
  return {
    [CALL_API]: {
      types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE],
      endpoint: 'register',
      config: {
        body: user,
        method: 'POST',
        onSuccess: response => response,
        onFailure: error => Promise.reject(error)
      }
    }
  };
};

export const clearAuthErrors = () => {
  return {
    type: [ERROR_AUTH_CLEAR]
  };
};

export const logout = () => dispatch => dispatch({
  [CALL_API]: {
    types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
    endpoint: 'logout',
    config: {
      onSuccess: () => {
        localStorage.removeItem('token');
        dispatch(fetchAccount());
      }
    }
  }
});

