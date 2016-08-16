import React from 'react';
import {reduxForm} from 'redux-form';
import counterpart from 'counterpart';
import {validateEmail} from '../util/misc';

import {resetPassword, newPasswordWithResetKey} from './auth';
import Password from './Password.component';

const validate = values => {
  const errors = {password: {}};
  if (!values.password.password || values.password.password.length < 5) {
    errors.password.password = counterpart.translate('account.errors.password.invalidLength');
  }
  if (values.password.retype !== values.password.password) {
    errors.password.retype = counterpart.translate('account.errors.password.dontMatch');
  }
  return errors;
};

const mapStateToProps = state => ({
  auth: state.get('auth')
});
class PasswordRecovery extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.onSubmit = this.onSubmit.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.state = {
      email: '',
      message: '',
      isError: false
    };
  }
  componentWillMount() {
    if (this.props.auth.get('isAuthenticated')) {
      this.context.router.push('/');
    }
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.props.routeParams.key) {
      if (this.props.fields.password.password.value) {
        this.props.newPasswordWithResetKey(
          this.props.routeParams.key,
          this.props.fields.password.password.value
        )
          .then(response => {
            this.props.resetForm();
            this.setState({message: response, isError: false});
          })
          .catch(error =>
            this.setState({message: error, isError: true}));
      }
      return;
    }
    this.props.resetPassword(this.state.email)
      .then(response => {
        this.props.resetForm();
        this.setState({message: response, isError: false});
      })
      .catch(error =>
        this.setState({message: error, isError: true}));
  }
  onEmailChange(event) {
    this.setState({email: event.target.value});
  }
  render() {
    if (this.state.message) {
      return (
        <div className="container">
          <div className={this.state.isErrora ? 'error-block' : 'success-block'}>
            {counterpart.translate(`account.errors.${this.state.message}`)}
          </div>
        </div>
      );
    }
    if (this.props.routeParams.key) {
      return (
        <div className="container">
          <form className="form-vertical-group form-login" onSubmit={this.onSubmit}>
            <Password {...this.props.fields.password}/>
            <button
                className="right"
                disabled={this.props.submitting || this.props.invalid}
                type="submit"
            >
              {counterpart.translate('general.submitChanges')}
            </button>
          </form>
        </div>
      );
    }
    return (
      <div className="container">
        <form className="form-vertical-group form-login" onSubmit={this.onSubmit}>
          <div className="form-group">
            <span className="span-flex">
              <input
                  onChange={this.onEmailChange}
                  placeholder={counterpart.translate('account.email')}
                  type="text"
                  value={this.state.email}
              />
            </span>
            <button
                disabled={!validateEmail(this.state.email)}
                type="submit"
            >
              {counterpart.translate('account.authenticate.sendResetLink')}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'recovery',
  fields: ['password.password', 'password.retype'],
  initialValues: {langKey: 'en'},
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
}, mapStateToProps, {
  resetPassword, newPasswordWithResetKey
})(PasswordRecovery);
