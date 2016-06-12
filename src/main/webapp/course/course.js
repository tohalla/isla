import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  COURSES_SET,
  COURSES_REQUEST,
  COURSES_FAILURE,
  COURSE_MODERATORS_SET,
  COURSE_MODERATORS_REQUEST,
  COURSE_MODERATORS_FAILURE,
  COURSE_ADD_SUCCESS,
  COURSE_ADD_REQUEST,
  COURSE_ADD_FAILURE,
  COURSE_UPDATE_SUCCESS,
  COURSE_UPDATE_REQUEST,
  COURSE_UPDATE_FAILURE,
  CALL_API
} from '../constants';

export default createReducer(fromJS({}), {
  [COURSES_REQUEST]: (state, action) => action.response,
  [COURSES_SET]: (state, action) => action.response,
  [COURSE_ADD_SUCCESS]: (state, action) => state.push(action.response),
  [COURSE_MODERATORS_SET]: (state, action) =>
    state.merge({moderators: action.response}),
  [COURSE_UPDATE_SUCCESS]: (state, action) => action.response
});

export const fetchCourseModerators = course => {
  return {
    [CALL_API]: {
      types: [
        COURSE_MODERATORS_REQUEST,
        COURSE_MODERATORS_SET,
        COURSE_MODERATORS_FAILURE
      ],
      endpoint: `courses/${course}/moderators`
    }
  };
};

export const fetchCourses = props => dispatch => {
  const endpoint = props.view ?
    `views/${props.view}/courses` : `courses/${props.course}/`;
  return dispatch({
    [CALL_API]: {
      types: [COURSES_REQUEST, COURSES_SET, COURSES_FAILURE],
      endpoint: endpoint
    }
  });
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

export const updateCourse = course => {
  return {
    [CALL_API]: {
      types: [
        COURSE_UPDATE_REQUEST,
        COURSE_UPDATE_SUCCESS,
        COURSE_UPDATE_FAILURE
      ],
      endpoint: 'courses',
      config: {
        body: course,
        method: 'PUT'
      }
    }
  };
};
