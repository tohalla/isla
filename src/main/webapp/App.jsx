import React from 'react';
import DevTools from './Devtools';
import {fetchAccount} from './auth/auth';
import store from './store';
import {connect} from 'react-redux';

import sock from 'sockjs-client';
import {Stomp} from 'stompjs/lib/stomp';
import config from './config';

store.dispatch(fetchAccount());

const socket = (() => {
  const socket = Stomp.over(sock(
    `${location.protocol}//${config.api.host}:${config.api.port}/websocket/`
  ));
  return new Promise((resolve, reject) => {
    socket.connect({},
      () => resolve(socket),
      () => reject()
    );
  });
})();

const mapStateToProps = state => ({
  auth: state.get('auth')
});

class App extends React.Component {
  static childContextTypes = {
    auth: React.PropTypes.object.isRequired,
    socket: React.PropTypes.object
  }
  getChildContext() {
    return {
      auth: this.props.auth.toJS(),
      socket
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

