import {useRouterHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {createHashHistory} from 'history';
import store from './store';

const history = useRouterHistory(createHashHistory)({queryKey: false});

export default syncHistoryWithStore(
  history,
  store,
  {selectLocationState: state => state.get('routing').toJS()}
);
