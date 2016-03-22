import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  COMMENTS_SET,
  COMMENTS_REQUEST,
  COMMENTS_FAILURE,
  CALL_API
} from '../constants';

export default createReducer(fromJS({}), {
  [COMMENTS_REQUEST]: state => {
    return state;
  },
  [COMMENTS_SET]: (state, action) => {
    return state.merge(action.response);
  },
  [COMMENTS_FAILURE]: state => {
    return state;
  }
});

export const fetchComments = lecture => {
  return {
    [CALL_API]: {
      types: [COMMENTS_REQUEST, COMMENTS_SET, COMMENTS_FAILURE],
      endpoint: `lectures/${lecture}/comments`
    }
  };
};
