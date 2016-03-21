import {combineReducers, createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {LOCATION_CHANGE} from 'react-router-redux';

import auth from './auth/auth';
import course from './course/course';
import comment from './comment/comment';
import lecture from './lecture/lecture';

const routerReducer = createReducer(fromJS({locationBeforeTransitions: null}), {
  [LOCATION_CHANGE]: (state, action) => {
    return state.merge({
      locationBeforeTransitions: action.payload
    });
  }
});

const entities = combineReducers({
  comment, course, lecture
});

export default combineReducers({
  auth,
  entities,
  routing: routerReducer
});
