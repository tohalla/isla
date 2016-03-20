import React from 'react';
import {connect} from 'react-redux';

import Login from './Login.component';
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
              {this.props.auth.getIn(['user', 'login'])}
            </span>
            <button
                className="material-icons icon-light icon-32"
                onClick={this.props.logout}
            >
              {'exit_to_app'}
            </button>
          </div> :
          <Login />
        }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {logout}
)(Authentication);
