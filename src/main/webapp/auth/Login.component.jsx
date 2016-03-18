import React from 'react';
import {connect} from 'react-redux';

import {login} from './auth.service';

export class Login extends React.Component {
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
          <label htmlFor="username">{'Username'}</label>
          <input
              id="username"
              onChange={this.handleUsernameChange}
              placeholder="Email address"
              type="email"
              value={this.state.username}
          />
          <label htmlFor="password">{'Password'}</label>
          <input
              id="password"
              onChange={this.handlePasswordChange}
              placeholder="Password"
              type="password"
              value={this.state.password}
          />
          <button
              onClick={this.login}
              type="submit"
          >
            {'Login'}
          </button>
        </div>
      </form>
    );
  }
}

export const LoginContainer = connect(
  null,
  {login}
)(Login);
