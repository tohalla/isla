import React from 'react';
import counterpart from 'counterpart';
import DevTools from './Devtools';
import {fetchAccount, setLocale} from './auth/auth';
import store from './store';
import {connect} from 'react-redux';

import sock from 'sockjs-client';
import {Stomp} from 'stompjs/lib/stomp';
import config from './config';

const fetchToken = store.dispatch(fetchAccount());

const mapStateToProps = state => ({
  auth: state.get('auth')
});
class App extends React.Component {
  static childContextTypes = {
    socket: React.PropTypes.object
  }
  constructor(state, context) {
    super(state, context);
    this.state = {
      socket: this.state ? this.state.socket : (() => {
        return fetchToken.then(() => {
          const socket = Stomp.over(sock(
            `${location.protocol}//${config.api.host}:${config.api.port}/` +
            `websocket?token=${localStorage.token || this.props.auth.getIn(['user', 'login'])}`
          ));
          return new Promise((resolve, reject) =>
            socket.connect({},
              () => resolve(socket),
              () => reject()
            )
          );
        });
      })()
    };
  }
  getChildContext() {
    return {
      socket: this.state.socket
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      window.previousLocation = this.props.location;
    }
    if (nextProps.auth.getIn(['user', 'langKey']) !== counterpart.getLocale()) {
      if (!nextProps.auth.getIn(['user', 'langKey']) && localStorage.langKey) {
        this.props.setLocale(localStorage.langKey);
        return;
      }
      counterpart.setLocale(
        nextProps.auth.getIn(['user', 'langKey']) ||
        localStorage.langKey ||
        'en'
      );
    }
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
  {setLocale}
)(App);

// translations
require('./i18n/translations');
// styles
require('normalize.css/normalize.css');
require('./styles/main.scss');
