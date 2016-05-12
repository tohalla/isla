import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import counterpart from 'counterpart';

import {login, clearAuthErrors} from './auth';
import WithLabel from '../util/WithLabel.component';

const mapStateToProps = state => ({
  auth: state.get('auth')
});
class Login extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
    this.allowSubmit = this.allowSubmit.bind(this);
    this.onLoginChange = this.onLoginChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.state = {
      login: '',
      password: ''
    };
  }
  componentWillMount() {
    this.props.clearAuthErrors();
    if (this.props.auth.get('isAuthenticated')) {
      this.context.router.push('/');
    }
  }
  shouldComponentUpdate(newProps, newState) {
    return !(
      this.state === newState &&
      this.props.value === newProps.value &&
      this.props.auth === newProps.auth
    );
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.login({
      login: this.state.login,
      password: this.state.password
    })
      .then(() => this.context.router.push('/'))
      .catch(() => this.setState({error: 'invalidLogin'}));
  }
  onLoginChange(event) {
    this.setState({login: event.target.value});
  }
  onPasswordChange(event) {
    this.setState({password: event.target.value});
  }
  allowSubmit() {
    return this.state.login.length && this.state.password.length;
  }
  render() {
    return (
      <div className="container">
        <form className="form-vertical-group form-login" onSubmit={this.onSubmit}>
          {this.state.error ?
            <div className="error-block">
              {counterpart.translate(`account.errors.${this.state.error}`)}
            </div> : null
          }
          <WithLabel label={counterpart.translate('account.login')}>
            <input
                onChange={this.onLoginChange}
                placeholder={counterpart.translate('account.login')}
                type="text"
                value={this.state.login}
            />
          </WithLabel>
          <WithLabel label={counterpart.translate('account.password')}>
            <input
                onChange={this.onPasswordChange}
                placeholder={counterpart.translate('account.password')}
                type="password"
                value={this.state.password}
            />
          </WithLabel>
          <div className="form-group">
            <Link to={'/register'}>
              {counterpart.translate('account.register.register')}
            </Link>
            <button
                disabled={!this.allowSubmit()}
                type="submit"
            >
              {counterpart.translate('account.authenticate.authenticate')}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {login, clearAuthErrors}
)(Login);
