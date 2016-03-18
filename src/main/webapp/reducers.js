import {combineReducers} from 'redux-immutablejs';

import auth from './auth/auth';
import comment from './comment/comment';

export default combineReducers({
  auth,
  comment
});
