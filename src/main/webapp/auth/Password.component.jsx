import React from 'react';
import counterpart from 'counterpart';

import WithLabel from '../util/WithLabel.component';
import WithErrors from '../util/WithErrors.component';

export default class Password extends React.Component {
  static propTypes = {
    hideLabels: React.PropTypes.bool,
    password: React.PropTypes.object.isRequired,
    retype: React.PropTypes.object.isRequired
  }
  shouldComponentUpdate(nextProps) {
    return this.props.password !== nextProps.password ||
      this.props.retype !== nextProps.retype;
  }
  render() {
    const {password, hideLabels, retype} = this.props;
    const item = hideLabels ? (
      <div>
        <div className="block">
          <input
              placeholder={
                counterpart.translate('account.password')}
              type="password"
              {...password}
          />
        </div>
        <div className="block">
          <input
              placeholder={
                counterpart.translate('account.retypePassword')
              }
              type="password"
              {...retype}
          />
        </div>
      </div>
    ) : (
      <div>
        <WithLabel label={counterpart.translate('account.password')}>
          <input
              placeholder={
                counterpart.translate('account.password')}
              type="password"
              {...password}
          />
        </WithLabel>
        <WithLabel label={counterpart.translate('account.retypePassword')}>
          <input
              placeholder={
                counterpart.translate('account.retypePassword')
              }
              type="password"
              {...retype}
          />
        </WithLabel>
      </div>
    );
    return (
      <WithErrors
          errors={Object.assign(
            retype.touched && retype.error ? {retype: retype.error} : {},
            password.touched ? {password: password.error} : {}
          )}
          item={item}
          title={counterpart.translate('account.password')}
      />
    );
  }
}
