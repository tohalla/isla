import React from 'react';
import {connect} from 'react-redux';

import {LoginContainer} from './Login.component';
import {logout} from './auth.service';

const mapStateToProps = state => ({
  auth: state.get('auth')
});

export class Authentication extends React.Component {
  render() {
    return (
      <div className="nav-login">
        {this.props.auth.get('isAuthenticated') ?
          <div className="form-vertical-group">
            <span>
              {this.props.auth.getIn(['user', 'username'])}
            </span>
            <button
                className="material-icons icon-light icon-32"
                onClick={this.props.logout}
            >
              {'exit_to_app'}
            </button>
          </div> :
          <LoginContainer />
        }
      </div>
    );
  }
}

export const AuthenticationContainer = connect(
  mapStateToProps,
  {logout}
)(Authentication);
