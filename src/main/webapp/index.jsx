import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';

import App from './App';
import Default from './containers/Default.component';
import Admin from './containers/Admin.component';
import Profile from './containers/Profile.component';
import Plain from './containers/Plain.component';
import View from './view/View.component';
import Frontpage from './view/Frontpage.component';
import store from './store';
import Login from './auth/Login.component';
import PasswordRecovery from './auth/PasswordRecovery.component';
import LectureInstance from './lecture/LectureInstance.component';
import Course from './course/Course.component';
import Register from './auth/Register.component';
import Activate from './auth/Activate.component';
import history from './history';

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route component={App}>
        <Route component={Default} path="/">
          <IndexRoute component={Frontpage} />
          <Route component={Login} path="authenticate" />
          <Route component={PasswordRecovery} path="recovery(/:key)" />
          <Route component={View} path="views/:id" />
          <Route component={Activate} path="activate" />
          <Route component={Admin} path="admin" />
          <Route component={Profile} path="profile" />
          <Route component={Course} path="courses/:id" />
          <Route component={Register} path="register" />
        </Route>
        <Route component={Plain} path="/instance">
          <Route component={LectureInstance} path=":id" />
        </Route>
      </Route>
    </Router>
  </Provider>
  ), document.getElementById('app')
);
