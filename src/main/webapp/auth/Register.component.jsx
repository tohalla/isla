import React from 'react';
import {connect} from 'react-redux';
import counterpart from 'counterpart';

import {login} from './auth.service';
import WithLabel from '../util/WithLabel.component';

class Register extends React.Component {
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
          <WithLabel
              item={
                <input
                    id="username"
                    onChange={this.handleUsernameChange}
                    placeholder="Email address"
                    type="text"
                    value={this.state.username}
                />
              }
              label={counterpart.translate('account.username')}
          />
          <WithLabel
              item={
                <input
                    id="username"
                    onChange={this.handleUsernameChange}
                    placeholder={counterpart.translate('account.email')}
                    type="email"
                    value={this.state.username}
                />
              }
              label={counterpart.translate('account.email')}
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
          <button
              className="right"
              onClick={this.login}
              type="submit"
          >
            {counterpart.translate('account.register.register')}
          </button>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  {login}
)(Register);
