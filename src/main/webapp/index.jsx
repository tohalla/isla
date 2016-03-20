import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, useRouterHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {createHashHistory} from 'history';

import App from './App';
import Default from './view/Default';
import store from './store';
import Login from './auth/Login.component';
import Register from './auth/Register.component';

const history = syncHistoryWithStore(
  useRouterHistory(createHashHistory)({queryKey: false}),
  store,
  {selectLocationState: state => state.get('routing').toJS()}
);

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route component={Default} path="/">
          <Route component={Login} path="authenticate" />
          <Route component={Register} path="register" />
        </Route>
      </Route>
    </Router>
  </Provider>
  ), document.getElementById('app')
);
