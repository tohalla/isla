import React from 'react';
import RequireAuthority from '../util/RequireAuthority.component';
import counterpart from 'counterpart';

export default class Profile extends React.Component {
  render() {
    return (
      <div className="container">
        <RequireAuthority
            alternativeItem={
              <div className="error-block">
                  {counterpart.translate("general.notAuthorizedToViewPage")}
              </div>
            }
            item={<span></span>}
            oneOf={['ROLE_ADMIN', 'ROLE_USER', 'ROLE_TEACHER']}
        />
      </div>
    );
  }
}
