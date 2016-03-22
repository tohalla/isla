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
  ACCOUNT_FAILURE
} from '../constants';

export default createReducer(
  fromJS({
    isFetching: false,
    isAuthenticated: false
  }), {
    [LOGIN_REQUEST]: () => {
      return fromJS({
        isFetching: true,
        isAuthenticated: false
      });
    },
    [LOGIN_SUCCESS]: () => {
      return fromJS({
        isFetching: false,
        isAuthenticated: true
      });
    },
    [LOGIN_FAILURE]: () => {
      return fromJS({
        isFetching: false,
        isAuthenticated: false
      });
    },
    [ACCOUNT_REQUEST]: () => {
      return fromJS({
        isFetching: true,
        isAuthenticated: false
      });
    },
    [ACCOUNT_SET]: (state, action) => {
      return fromJS({
        isFetching: false,
        isAuthenticated: true
      }).set('user', action.response);
    },
    [ACCOUNT_FAILURE]: () => {
      return fromJS({
        isFetching: false,
        isAuthenticated: false
      });
    },
    [REGISTER_SUCCESS]: () => {
      return fromJS({});
    },
    [REGISTER_FAILURE]: (state, action) => {
      return action.auth;
    },
    [LOGOUT_SUCCESS]: () => {
      return fromJS({
        isFetching: false,
        isAuthenticated: false
      });
    },
    [LOGOUT_REQUEST]: state => {
      return state.set('isFetching', true);
    },
    [LOGOUT_FAILURE]: state => {
      return state.set('isFetching', false);
    }
  }
);

export const fetchAccount = () => {
  return {
    [CALL_API]: {
      types: [ACCOUNT_REQUEST, ACCOUNT_SET, ACCOUNT_FAILURE],
      endpoint: 'account'
    }
  };
};

export const login = credentials => {
  return {
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
          fetchAccount();
        }
      }
    }
  };
};

export const register = user => {
  return {
    [CALL_API]: {
      types: [REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE],
      endpoint: 'register',
      config: {
        body: user,
        method: 'POST'
      }
    }
  };
};

export const logout = () => {
  return {
    [CALL_API]: {
      types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE],
      endpoint: 'logout',
      config: {
        onSuccess: () => {
          localStorage.removeItem('token');
        }
      }
    }
  };
};

