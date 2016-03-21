import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import counterpart from 'counterpart';
import history from '../history';

import {login} from './auth.service';
import WithLabel from '../util/WithLabel.component';

const mapStateToProps = state => (
  {isAuthenticated: state.getIn(['auth', 'isAuthenticated'])
});

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.login = this.login.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      login: '',
      password: ''
    };
  }
  componentWillMount() {
    if (this.props.isAuthenticated) {
      history.push('/');
    }
  }
  shouldComponentUpdate(newProps, newState) {
    return !(this.state === newState && this.props.value === newProps.value);
  }
  login(event) {
    event.preventDefault();
    this.props.login({
      login: this.state.login,
      password: this.state.password
    });
    history.push('/');
  }
  handleLoginChange(event) {
    this.setState({login: event.target.value});
  }
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  render() {
    return (
      <div className="form-vertical-group">
        <WithLabel
            item={
              <input
                  id="login"
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
            {counterpart.translate('account.authenticate.authenticate')}
          </button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {login}
)(Login);
