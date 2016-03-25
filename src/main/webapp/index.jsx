import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route} from 'react-router';

import App from './App';
import Default from './view/Default.component';
import Plain from './view/Plain.component';
import store from './store';
import Login from './auth/Login.component';
import CourseList from './course/CourseList.component';
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
          <Route component={Login} path="authenticate" />
          <Route component={Activate} path="activate" />
          <Route component={CourseList} path="courses" />
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
