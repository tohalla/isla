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
  [COURSES_SET]: (state, action) => {
    return action.response;
  },
  [COURSE_ADD_SUCCESS]: (state, action) => {
    return state.push(action.response);
  }
});

export const fetchCourses = id => {
  return {
    [CALL_API]: {
      types: [COURSES_REQUEST, COURSES_SET, COURSES_FAILURE],
      endpoint: 'courses' + (id ? `/${id}` : '')
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
