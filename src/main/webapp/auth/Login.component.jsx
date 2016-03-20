import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import counterpart from 'counterpart';
import {push} from 'react-router-redux';

import {login} from './auth.service';
import WithLabel from '../util/WithLabel.component';

const mapStateToProps = state =>
 ({loggedInAs: state.getIn(['auth', 'user', 'login'])});

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.login = this.login.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      username: '',
      password: ''
    };
  }
  shouldComponentUpdate(nextProps) {
    if (typeof nextProps.loggedInAs === 'undefined') {
      return true;
    }
    nextProps.push('/');
    return false;
  }
  login(event) {
    event.preventDefault();
    this.props.login({
      username: this.state.username,
      password: this.state.password
    });
  }
  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  render() {
    return (
      <form role="form">
        <div className="form-vertical-group">
          <WithLabel
              item={
                <input
                    id="username"
                    onChange={this.handleUsernameChange}
                    placeholder={counterpart.translate('account.username')}
                    type="text"
                    value={this.state.username}
                />
              }
              label={counterpart.translate('account.username')}
          />
          <WithLabel
              item={
                <input
                    id="password"
                    onChange={this.handlePasswordChange}
                    placeholder={counterpart.translate('account.password')}
                    type="password"
                    value={this.state.password}
                />
              }
              label={counterpart.translate('account.password')}
          />
          <div className="form-group">
            <Link to={'/register'}>
              {counterpart.translate('account.register.register')}
            </Link>
            <button
                onClick={this.login}
                type="submit"
            >
              {counterpart.translate('account.login.login')}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  {login, push}
)(Login);
