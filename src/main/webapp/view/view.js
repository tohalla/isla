import {createReducer} from 'redux-immutablejs';
import {fromJS} from 'immutable';

import {
  VIEWS_SET,
  VIEWS_REQUEST,
  VIEWS_FAILURE,
  CALL_API
} from '../constants';

export default createReducer(fromJS({}), {
  [VIEWS_REQUEST]: (state, action) => action.response,
  [VIEWS_SET]: (state, action) => action.response
});

export const fetchViews = id => {
  return {
    [CALL_API]: {
      types: [VIEWS_REQUEST, VIEWS_SET, VIEWS_FAILURE],
      endpoint: id ? `views/${id}` : 'views/menu'
    }
  };
};
