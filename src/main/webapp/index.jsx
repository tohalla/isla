import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';

import App from './App';
import Default from './view/Default';
import store from './store';

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}>
        <Route component={Default} path="/" />
      </Route>
    </Router>
  </Provider>
  ), document.getElementById('app')
);

// styles
require('normalize.css');
require('./styles/main.scss');

