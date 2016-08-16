import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  USERS_SET,
  USERS_REQUEST,
  USERS_FAILURE,
  CALL_API
} from '../constants';

export default createReducer(fromJS({}), {
  [USERS_REQUEST]: (state, action) => action.response,
  [USERS_SET]: (state, action) => action.response
});

export const fetchUsers = id => {
  return {
    [CALL_API]: {
      types: [USERS_REQUEST, USERS_SET, USERS_FAILURE],
      endpoint: id ? `users/${id}` : 'users'
    }
  };
};
