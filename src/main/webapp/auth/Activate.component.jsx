import React from 'react';
import {connect} from 'react-redux';
import counterpart from 'counterpart';
import {Link} from 'react-router';

import {activate, clearAuthErrors} from './auth';
import {getValueFromQueryString} from '../util/misc';

const mapStateToProps = state => ({
  auth: state.get('auth')
});

class Activate extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  componentWillMount() {
    this.props.clearAuthErrors();
    this.props.activate(
      getValueFromQueryString(this.props.location.search, 'key')
    )
      .then(() => this.setState({ok: true, message: 'activated'}))
      .catch(() => this.setState({ok: false, message: 'invalidCode'}));
    if (this.props.auth.get('isAuthenticated')) {
      this.context.router.push('/');
    }
  }
  shouldComponentUpdate(newProps, newState) {
    return this.state !== newState;
  }
  render() {
    return this.state ? (
      <div className="container">
        <div className={this.state.ok ? 'success-block' : 'error-block'}>
          {counterpart.translate(`account.activate.${this.state.message}`) + ' '}
          {this.state.ok ?
            <Link to="/authenticate">
              {counterpart.translate('account.authenticate.authenticate')}
            </Link> : null
          }
        </div>
      </div>
    ) : null;
  }
}

export default connect(
  mapStateToProps,
  {activate, clearAuthErrors}
)(Activate);
