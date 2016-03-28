import React from 'react';
import RequireAuthority from '../util/RequireAuthority.component';
import counterpart from 'counterpart';

export default class Default extends React.Component {
  render() {
    return (
      <div className="container">
        <RequireAuthority
            alternativeItem={
              <div className="error-block">
                  {counterpart.translate("general.notAuthorizedToViewPage")}
              </div>
            }
            authority="ROLE_ADMIN"
            item={<span></span>}
        />
      </div>
    );
  }
}
