import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  COURSES_SET,
  COURSES_REQUEST,
  COURSES_FAILURE,
  CALL_API
} from '../constants';

export default createReducer(fromJS({}), {
  [COURSES_REQUEST]: state => {
    return state;
  },
  [COURSES_SET]: (state, action) => {
    return state.merge(action.response);
  },
  [COURSES_FAILURE]: state => {
    return state;
  }
});

export const fetchCourses = () => {
  return {
    [CALL_API]: {
      types: [COURSES_REQUEST, COURSES_SET, COURSES_FAILURE],
      endpoint: 'courses'
    }
  };
};
