import React from 'react';
import counterpart from 'counterpart';
import {reduxForm} from 'redux-form';

import RequireAuthority from '../util/RequireAuthority.component';
import EditableField from '../util/EditableField.component';
import Password from '../auth/Password.component';
import {update} from '../auth/auth';
import Locales from '../i18n/Locales.component';
import WithLabel from '../util/WithLabel.component';

const fields = [
  'password.password',
  'password.retype',
  'firstName',
  'lastName',
  'langKey'
];

const validate = values => {
  const errors = {password: {}};
  if (values.password.password && values.password.password.length < 5) {
    errors.password.password = counterpart.translate('account.errors.password.invalidLength');
  }
  if (values.password.retype && values.password.retype !== values.password.password) {
    errors.password.retype = counterpart.translate('account.errors.password.dontMatch');
  }
  return errors;
};

class Profile extends React.Component {
  static contextTypes = {
    auth: React.PropTypes.object.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    if (this.context.auth.user) {
      const {firstName, lastName, langKey} = this.context.auth.user;
      this.props.initializeForm({
        firstName,
        lastName,
        password: {
          password: '',
          retype: ''
        },
        langKey
      });
    }
  }
  componentWillReceiveProps(nextProps, nextContext) {
    if (
      nextContext.auth.user &&
      JSON.stringify(nextContext.auth.user) !== JSON.stringify(this.context.auth.user)
    ) {
      const {firstName, lastName, langKey} = nextContext.auth.user;
      nextProps.initializeForm({
        firstName,
        lastName,
        password: {
          password: '',
          retype: ''
        },
        langKey
      });
      nextProps.resetForm();
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.update(Object.assign({
      login: this.context.auth.user.login,
      langKey: this.props.fields.langKey.value,
      firstName: this.props.fields.firstName.value,
      lastName: this.props.fields.lastName.value,
      password: this.props.fields.password.password.value
    }))
      .then(() => {
        this.props.resetForm();
      })
      .catch(error => this.setState(error));
  }
  render() {
    const user = this.context.auth.user;
    const {
      fields: {password, firstName, lastName, langKey},
      pristine,
      error
    } = this.props;
    return (
      <form
          className="container"
          method="post"
          onSubmit={this.handleSubmit}
      >
        {this.context.auth.isFetching ? null :
          <RequireAuthority
              alternativeItem={
                <div className="error-block">
                    {counterpart.translate("general.notAuthorizedToViewPage")}
                </div>
              }
              item={
                user ?
                <div className="container">
                  <div className="form-vertical-group">
                    <div className="form-group">
                      <b>{counterpart.translate('account.login')}</b>
                      <span>{user.login}</span>
                    </div>
                    <div className="form-group">
                      <b>{counterpart.translate('account.email')}</b>
                      <span>{user.email}</span>
                    </div>
                    <div className="form-group">
                      <b>{counterpart.translate('account.firstName')}</b>
                      <EditableField
                          allowChanges={!firstName.error && (firstName.touched || firstName.active)}
                          displayValue={firstName.value}
                          editField={<input {...firstName} placeholder={counterpart.translate('account.firstName')}/>}
                      />
                    </div>
                    <div className="form-group">
                      <b>{counterpart.translate('account.lastName')}</b>
                      <EditableField
                          allowChanges={!lastName.error && (lastName.touched || lastName.active)}
                          displayValue={lastName.value}
                          editField={<input {...lastName} placeholder={counterpart.translate('account.lastName')}/>}
                      />
                    </div>
                    <div className="form-group">
                      <b>{counterpart.translate('account.password')}</b>
                      <EditableField
                          allowChanges={
                            (!password.password.error && (password.password.touched || password.password.active)) &&
                            (!password.retype.error && (password.retype.touched || password.retype.active))
                          }
                          displayValue={''}
                          editField={<Password hideLabels {...password}/>}
                      />
                    </div>
                    <WithLabel bold label={counterpart.translate('account.selectDefaultLanguage')}>
                      <Locales field={langKey}/>
                    </WithLabel>
                    {!pristine && !error ?
                      <div cassName="block">
                        <button className="right">{counterpart.translate('general.submitChanges')}</button>
                      </div> : null
                    }
                  </div>
                </div> : <span />
              }
              oneOf={['ROLE_ADMIN', 'ROLE_USER', 'ROLE_TEACHER']}
          />
        }
      </form>
    );
  }
}

export default reduxForm({
  form: 'register',
  fields,
  validate,
  getFormState: (state, reduxMountPoint) => state.get(reduxMountPoint).toJS()
}, null, {
  update
})(Profile);
