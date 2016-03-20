import {combineReducers, createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {LOCATION_CHANGE} from 'react-router-redux';

import auth from './auth/auth';
import comment from './comment/comment';

const routerReducer = createReducer(fromJS({locationBeforeTransitions: null}), {
  [LOCATION_CHANGE]: (state, action) => {
    return state.merge({
      locationBeforeTransitions: action.payload
    });
  }
});

export default combineReducers({
  auth,
  comment,
  routing: routerReducer
});
