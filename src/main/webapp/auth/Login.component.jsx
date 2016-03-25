import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import counterpart from 'counterpart';

import {login} from './auth';
import WithLabel from '../util/WithLabel.component';

class Login extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      login: '',
      password: ''
    };
  }
  componentWillMount() {
    if (this.context.auth.isAuthenticated) {
      this.context.router.push('/');
    }
  }
  shouldComponentUpdate(newProps, newState, newContext) {
    return !(
      this.state === newState &&
      this.props.value === newProps.value &&
      JSON.stringify(this.context) === JSON.stringify(newContext)
    );
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.login({
      login: this.state.login,
      password: this.state.password
    });
    this.context.router.push('/');
  }
  handleLoginChange(event) {
    this.setState({login: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  render() {
    return (
      <form className="form-vertical-group form-login" onSubmit={this.onSubmit}>
        <WithLabel
            item={
              <input
                  onChange={this.handleLoginChange}
                  placeholder={counterpart.translate('account.login')}
                  type="text"
                  value={this.state.login}
              />
            }
            label={counterpart.translate('account.login')}
        />
        <WithLabel
            item={
              <input
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
              type="submit"
          >
            {counterpart.translate('account.authenticate.authenticate')}
          </button>
        </div>
      </form>
    );
  }
}

export default connect(
  null,
  {login}
)(Login);
