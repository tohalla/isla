import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  LECTURES_SET,
  LECTURES_REQUEST,
  LECTURES_FAILURE,
  LECTURE_ADD_SUCCESS,
  LECTURE_ADD_REQUEST,
  LECTURE_ADD_FAILURE,
  CALL_API
} from '../constants';

export default createReducer(fromJS({}), {
  [LECTURES_SET]: (state, action) => {
    return action.response;
  },
  [LECTURE_ADD_SUCCESS]: (state, action) => {
    console.log(action);
    return state.push(action.response);
  }
});

export const fetchLectures = course => {
  return {
    [CALL_API]: {
      types: [LECTURES_REQUEST, LECTURES_SET, LECTURES_FAILURE],
      endpoint: `courses/${course}/lectures`
    }
  };
};

export const addLecture = lecture => {
  return {
    [CALL_API]: {
      types: [LECTURE_ADD_REQUEST, LECTURE_ADD_SUCCESS, LECTURE_ADD_FAILURE],
      endpoint: 'courses',
      config: {
        body: lecture,
        method: 'POST'
      }
    }
  };
};
