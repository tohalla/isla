import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  COMMENTS_SET,
  COMMENTS_REQUEST,
  COMMENTS_FAILURE,
  COMMENT_ADD_SUCCESS,
  COMMENT_ADD_REQUEST,
  COMMENT_ADD_FAILURE,
  CALL_API
} from '../constants';

export default createReducer(fromJS([]), {
  [COMMENTS_REQUEST]: (state, action) => action.response,
  [COMMENTS_SET]: (state, action) => action.response,
  [COMMENT_ADD_SUCCESS]: (state, action) => state.push(action.response)
});

export const fetchComments = lecture => {
  return {
    [CALL_API]: {
      types: [COMMENTS_REQUEST, COMMENTS_SET, COMMENTS_FAILURE],
      endpoint: `lectures/${lecture}/comments`
    }
  };
};

export const addComment = comment => {
  return {
    [CALL_API]: {
      types: [COMMENT_ADD_REQUEST, COMMENT_ADD_SUCCESS, COMMENT_ADD_FAILURE],
      endpoint: 'comments',
      config: {
        body: comment,
        method: 'POST'
      }
    }
  };
};
