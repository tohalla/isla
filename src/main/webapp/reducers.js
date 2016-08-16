import {combineReducers, createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';
import {LOCATION_CHANGE} from 'react-router-redux';
import {reducer as form} from 'redux-form';

import auth from './auth/auth';
import courses from './course/course';
import comments from './comment/comment';
import views from './view/view';
import users from './user/user';
import lectures from './lecture/lecture';

const routing = createReducer(fromJS({locationBeforeTransitions: null}), {
  [LOCATION_CHANGE]: (state, action) =>
    state.merge({
      locationBeforeTransitions: action.payload
    })
});

const entities = combineReducers({
  comments, courses, lectures, views, users
});

export default combineReducers({
  auth,
  entities,
  form: (state = fromJS({}), action) => fromJS(form(state.toJS(), action)),
  routing
});
