import React from 'react';
import DevTools from './Devtools';
import {fetchAccount} from './auth/auth';
import store from './store';
import {connect} from 'react-redux';

// if jwt found..
if (localStorage.token) {
  store.dispatch(fetchAccount());
}

const mapStateToProps = state => ({
  auth: state.get('auth')
});

class App extends React.Component {
  static childContextTypes = {
    auth: React.PropTypes.object.isRequired
  }
  getChildContext() {
    return {
      auth: this.props.auth.toJS()
    };
  }
  render() {
    return (
      <div className="stretch">
        {this.props.children}
        {process.env.NODE_ENV === 'production' ? null : <DevTools />}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {}
)(App);

// translations
require('./i18n/translations');
// styles
require('normalize.css/normalize.css');
require('./styles/main.scss');

