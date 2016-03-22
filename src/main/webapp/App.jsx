import React from 'react';
import DevTools from './Devtools';
import {fetchAccount} from './auth/auth';
import store from './store';

// if jwt found..
if (localStorage.token) {
  store.dispatch(fetchAccount());
}

const App = class extends React.Component {
  render() {
    return (
      <div className="stretch">
        {this.props.children}
        {process.env.NODE_ENV === 'production' ? null : <DevTools />}
      </div>
    );
  }
};

export default App;

// translations
require('./i18n/translations');
// styles
require('normalize.css/normalize.css');
require('./styles/main.scss');
