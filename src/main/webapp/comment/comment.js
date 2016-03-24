import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  COMMENTS_SET,
  COMMENTS_REQUEST,
  COMMENTS_FAILURE,
  COMMENT_ADD,
  COMMENT_UPDATE,
  CALL_API
} from '../constants';

export default createReducer(fromJS([]), {
  [COMMENTS_REQUEST]: (state, action) => action.response,
  [COMMENTS_SET]: (state, action) => action.response,
  [COMMENT_ADD]: (state, action) => state.push(action.comment),
  [COMMENT_UPDATE]: (state, action) => (
    action.comment.get('deleted') ?
    state.filterNot(comment => comment.get('id') === action.comment.get('id')) :
    state.map(comment =>
      comment.get('id') === action.comment.get('id') ?
        comment.merge(action.comment) :
        comment
      )
  )
});

export const fetchComments = lecture => {
  return {
    [CALL_API]: {
      types: [COMMENTS_REQUEST, COMMENTS_SET, COMMENTS_FAILURE],
      endpoint: `lectures/${lecture}/comments`
    }
  };
};

export const updateComment = comment => ({
  type: COMMENT_UPDATE,
  comment
});

export const addComment = comment => ({
  type: COMMENT_ADD,
  comment
});
