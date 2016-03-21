import {combineReducers, createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {LOCATION_CHANGE} from 'react-router-redux';

import auth from './auth/auth';
import courses from './course/course';
import comments from './comment/comment';
import lectures from './lecture/lecture';

const routerReducer = createReducer(fromJS({locationBeforeTransitions: null}), {
  [LOCATION_CHANGE]: (state, action) => {
    return state.merge({
      locationBeforeTransitions: action.payload
    });
  }
});

const entities = combineReducers({
  comments, courses, lectures
});

export default combineReducers({
  auth,
  entities,
  routing: routerReducer
});
