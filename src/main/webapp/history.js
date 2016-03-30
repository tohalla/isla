import {useRouterHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {createHashHistory} from 'history';
import store from './store';

export default syncHistoryWithStore(
  useRouterHistory(createHashHistory)({queryKey: false}),
  store,
  {selectLocationState: state => state.get('routing').toJS()}
);
