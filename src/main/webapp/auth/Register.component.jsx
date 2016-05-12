import React from 'react';
import counterpart from 'counterpart';
import {reduxForm} from 'redux-form';

import {register, clearAuthErrors} from './auth';
import Password from './Password.component';
import WithLabel from '../util/WithLabel.component';
import WithErrors from '../util/WithErrors.component';
import Locales from '../i18n/Locales.component';
import {validateEmail} from '../util/misc';

const fields = [
  'login',
  'password.password',
  'password.retype',
  'email',
  'firstName',
  'lastName',
  'langKey'
];

const validate = values => {
  const errors = {password: {}};
  if (!values.password.password || values.password.password.length < 5) {
    errors.password.password = counterpart.translate('account.errors.password.invalidLength');
  }
  if (values.password.retype !== values.password.password) {
    errors.password.retype = counterpart.translate('account.errors.password.dontMatch');
  }
  if (!validateEmail(values.email)) {
    errors.email = counterpart.translate('account.errors.email.invalid');
  }
  return errors;
};

const mapStateToProps = state => ({
  auth: state.get('auth')
});
class Register extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.props.clearAuthErrors();
    if (this.props.auth.get('isAuthenticated')) {
      this.context.router.push('/');
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.register(Object.assign({
      login: this.props.fields.login.value,
      langKey: this.props.fields.langKey.value,
      email: this.props.fields.email.value,
      password: this.props.fields.password.password.value
    }))
      .then(() => {
        this.setState({completed: true});
        this.props.resetForm();
      })
      .catch(error => this.setState(error));
  }
  render() {
    if (this.state && this.state.completed) {
      return (
        <form className="container">
          <div className="success-block">
            {counterpart.translate('account.register.completed')}
          </div>
        </form>
      );
    }
    const {
      fields: {login, password, email, langKey},
      submitting,
      invalid
    } = this.props;
    return (
      <form
          className="container form-vertical-group form-register"
          method="post"
          onSubmit={this.handleSubmit}
      >
        {this.state && this.state.error ?
          <div className="error-block">
            {counterpart.translate(`account.errors.${this.state.error}`)}
          </div> : null
        }
        <WithErrors
            errors={email.touched ? {email: email.error} : {}}
            item={
              <WithLabel label={counterpart.translate('account.email')}>
                <input
                    placeholder={counterpart.translate('account.email')}
                    type="email"
                    {...email}
                />
              </WithLabel>
            }
            title={counterpart.translate('account.email')}
        />
        <WithLabel label={counterpart.translate('account.login')}>
          <input
              placeholder={counterpart.translate('account.login')}
              type="text"
              {...login}
          />
        </WithLabel>
        <Password {...password}/>
        <WithLabel label={counterpart.translate('account.selectDefaultLanguage')}>
          <Locales field={langKey}/>
        </WithLabel>
        <div className="form-roup">
          <button
              className="right"
              disabled={submitting || invalid}
              type="submit"
          >
            {counterpart.translate('account.register.register')}
          </button>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'register',
  fields,
  initialValues: {langKey: 'en'},
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
}, mapStateToProps, {
  register, clearAuthErrors
})(Register);
