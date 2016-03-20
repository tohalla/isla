import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';

import App from './App';
import Default from './view/Default';
import store from './store';
import Login from './auth/Login.component';
import Register from './auth/Register.component';

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
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
