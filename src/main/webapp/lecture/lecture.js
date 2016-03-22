import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  LECTURES_SET,
  LECTURES_REQUEST,
  LECTURES_FAILURE,
  CALL_API
} from '../constants';

export default createReducer(fromJS({}), {
  [LECTURES_SET]: (state, action) => {
    return action.response;
  }
});

export const fetchLectures = course => {
  console.log(course);
  return {
    [CALL_API]: {
      types: [LECTURES_REQUEST, LECTURES_SET, LECTURES_FAILURE],
      endpoint: `courses/${course}/lectures`
    }
  };
};
