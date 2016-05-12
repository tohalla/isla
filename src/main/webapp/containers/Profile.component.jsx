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

const mapStateToProps = state => ({
  auth: state.get('auth')
});
class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    if (this.props.auth.get('user')) {
      this.props.initializeForm({
        firstName: this.props.auth.getIn(['user', 'firstName']),
        lastName: this.props.auth.getIn(['user', 'lastName']),
        password: {
          password: '',
          retype: ''
        },
        langKey: this.props.auth.getIn(['user', 'langKey'])
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.auth.user &&
      nextProps.auth.user !== this.props.auth.user
    ) {
      nextProps.initializeForm({
        firstName: nextProps.auth.getIn(['user', 'firstName']),
        lastName: nextProps.auth.getIn(['user', 'lastName']),
        password: {
          password: '',
          retype: ''
        },
        langKey: nextProps.auth.getIn(['user', 'langKey'])
      });
      nextProps.resetForm();
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.update(Object.assign({
      login: this.props.auth.getIn(['user', 'login']),
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
    const user = this.props.auth.get('user');
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
        {this.props.auth.get('isFetching') ? null :
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
                      <WithLabel
                          bold
                          displayLabelOnMobile
                          label={counterpart.translate('account.login')}
                      >
                        <span>{user.get('login')}</span>
                      </WithLabel>
                    </div>
                    <div className="form-group">
                      <WithLabel
                          bold
                          displayLabelOnMobile
                          label={counterpart.translate('account.email')}
                      >
                        <span>{user.get('email')}</span>
                      </WithLabel>
                    </div>
                    <div className="form-group">
                      <EditableField
                          allowChanges={!firstName.error && (firstName.touched || firstName.active)}
                          displayValue={
                            <WithLabel
                                bold
                                displayLabelOnMobile
                                label={counterpart.translate('account.firstName')}
                            >
                              {firstName.value}
                            </WithLabel>
                          }
                          editField={<input {...firstName} placeholder={counterpart.translate('account.firstName')}/>}
                      />
                    </div>
                    <div className="form-group">
                      <EditableField
                          allowChanges={!lastName.error && (lastName.touched || lastName.active)}
                          displayValue={
                            <WithLabel
                                bold
                                displayLabelOnMobile
                                label={counterpart.translate('account.lastName')}
                            >
                              {lastName.value}
                            </WithLabel>
                          }
                          editField={<input {...lastName} placeholder={counterpart.translate('account.lastName')}/>}
                      />
                    </div>
                    <div className="form-group">
                      <EditableField
                          allowChanges={
                            (!password.password.error && (password.password.touched || password.password.active)) &&
                            (!password.retype.error && (password.retype.touched || password.retype.active))
                          }
                          displayValue={
                            <WithLabel
                                bold
                                displayLabelOnMobile
                                label={counterpart.translate('account.password')}
                            >
                              {''}
                            </WithLabel>
                          }
                          editField={<Password hideLabels {...password}/>}
                      />
                    </div>
                    <WithLabel
                        bold
                        displayLabelOnMobile
                        label={counterpart.translate('account.selectDefaultLanguage')}
                    >
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
}, mapStateToProps, {
  update
})(Profile);
