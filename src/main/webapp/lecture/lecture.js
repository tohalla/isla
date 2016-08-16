import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  LECTURES_SET,
  LECTURES_REQUEST,
  LECTURES_FAILURE,
  LECTURE_ADD_SUCCESS,
  LECTURE_ADD_REQUEST,
  LECTURE_ADD_FAILURE,
  LECTURE_CLOSE_SUCCESS,
  LECTURE_CLOSE_REQUEST,
  LECTURE_CLOSE_FAILURE,
  CALL_API
} from '../constants';

export default createReducer(fromJS({}), {
  [LECTURES_REQUEST]: (state, action) => action.response,
  [LECTURES_SET]: (state, action) => action.response,
  [LECTURE_ADD_SUCCESS]: (state, action) => state.push(action.response),
  [LECTURE_CLOSE_SUCCESS]: (state, action) => state.map(lecture =>
    lecture.get('id') === action.response.get('id') ?
      action.response : lecture
  )
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

export const closeLecture = lecture => {
  return {
    [CALL_API]: {
      types: [
        LECTURE_CLOSE_REQUEST,
        LECTURE_CLOSE_SUCCESS,
        LECTURE_CLOSE_FAILURE
      ],
      endpoint: `lectures/${lecture.id}/close`,
      config: {
        method: 'POST'
      }
    }
  };
};
