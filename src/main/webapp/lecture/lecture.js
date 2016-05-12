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
  [LECTURES_REQUEST]: (state, action) => action.response,
  [LECTURES_SET]: (state, action) => action.response,
  [LECTURE_ADD_SUCCESS]: (state, action) => state.push(action.response)
});

export const fetchLectures = props => {
  const endpoint = props.course ?
    `courses/${props.course}/lectures` : `lectures/${props.lecture}/`;
  return {
    [CALL_API]: {
      types: [LECTURES_REQUEST, LECTURES_SET, LECTURES_FAILURE],
      endpoint
    }
  };
};

export const fetchActiveLectures = () => {
  return {
    [CALL_API]: {
      types: [LECTURES_REQUEST, LECTURES_SET, LECTURES_FAILURE],
      endpoint: 'lectures/active'
    }
  };
};

export const addLecture = lecture => {
  return {
    [CALL_API]: {
      types: [LECTURE_ADD_REQUEST, LECTURE_ADD_SUCCESS, LECTURE_ADD_FAILURE],
      endpoint: 'lectures',
      config: {
        body: lecture,
        method: 'POST'
      }
    }
  };
};
