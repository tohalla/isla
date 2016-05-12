import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  CALL_API,
  REGISTER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_FAILURE,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  ACTIVATE_REQUEST,
  ACTIVATE_SUCCESS,
  ACTIVATE_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  ACCOUNT_REQUEST,
  ACCOUNT_SET,
  ACCOUNT_FAILURE,
  ERROR_AUTH_CLEAR,
  SET_LOCALE
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
    [ACCOUNT_REQUEST]: (state, action) =>
      state.merge({isFetching: true}, action.response),
    [LOGOUT_FAILURE]: (state, action) =>
      state.merge({isFetching: false}, action.response),
    [REGISTER_FAILURE]: (state, action) =>
      state.merge({isFetching: false}, action.response),
    [ERROR_AUTH_CLEAR]: state => state.delete('error'),
    [SET_LOCALE]: (state, action) => state.setIn(['user', 'langKey'], action.locale)
  }
);

export const activate = key => {
  return {
    [CALL_API]: {
      types: [ACTIVATE_REQUEST, ACTIVATE_SUCCESS, ACTIVATE_FAILURE],
      endpoint: 'activate',
      config: {
        params: {key},
        onSuccess: data => data,
        onFailure: error => Promise.reject(error)
      }
    }
  };
};

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
        window.location = '/';
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

export const update = user => dispatch => dispatch({
  [CALL_API]: {
    types: [UPDATE_ACCOUNT_REQUEST, UPDATE_ACCOUNT_SUCCESS, UPDATE_ACCOUNT_FAILURE],
    endpoint: 'account',
    config: {
      body: user,
      method: 'POST',
      onSuccess: () => dispatch(fetchAccount()),
      onFailure: error => Promise.reject(error)
    }
  }
});

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
        window.location = '/';
      }
    }
  }
});

export const setLocale = locale => {
  localStorage.setItem('langKey', locale);
  return {type: SET_LOCALE, locale};
};
