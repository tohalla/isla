import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  LECTURES_SET,
  LECTURES_REQUEST,
  LECTURES_FAILURE,
  CALL_API
} from '../constants';

export default createReducer(fromJS({}), {
  [LECTURES_REQUEST]: state => {
    return state;
  },
  [LECTURES_SET]: (state, action) => {
    return state.merge(action.response);
  },
  [LECTURES_FAILURE]: state => {
    return state;
  }
});

export const fetchLectures = course => {
  return {
    [CALL_API]: {
      types: [LECTURES_REQUEST, LECTURES_SET, LECTURES_FAILURE],
      endpoint: typeof course === 'undefined' ?
        'lectures' : `courses/${course}/lectures`
    }
  };
};
