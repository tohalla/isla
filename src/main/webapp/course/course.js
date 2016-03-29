import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  COURSES_SET,
  COURSES_REQUEST,
  COURSES_FAILURE,
  COURSE_ADD_SUCCESS,
  COURSE_ADD_REQUEST,
  COURSE_ADD_FAILURE,
  CALL_API
} from '../constants';

export default createReducer(fromJS([]), {
  [COURSES_REQUEST]: (state, action) => action.response,
  [COURSES_SET]: (state, action) => action.response,
  [COURSE_ADD_SUCCESS]: (state, action) => state.push(action.response)
});

export const fetchCourses = props => {
  const endpoint = props.view ?
    `views/${props.view}/courses` : `courses/${props.course}/`;
  return {
    [CALL_API]: {
      types: [COURSES_REQUEST, COURSES_SET, COURSES_FAILURE],
      endpoint: endpoint
    }
  };
};

export const addCourse = course => {
  return {
    [CALL_API]: {
      types: [COURSE_ADD_REQUEST, COURSE_ADD_SUCCESS, COURSE_ADD_FAILURE],
      endpoint: 'courses',
      config: {
        body: course,
        method: 'POST'
      }
    }
  };
};
