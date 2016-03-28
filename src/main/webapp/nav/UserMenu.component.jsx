import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import counterpart from 'counterpart';

import {logout} from '../auth/auth';
import RequireAuthority from '../util/RequireAuthority.component';

class UserMenu extends React.Component {
  static propTypes = {
    auth: React.PropTypes.object.isRequired
  }
  render() {
    return (
      <span className="user-menu">
        {this.props.auth.isAuthenticated ?
          <span>
            <span>
              {counterpart.translate("general.loggedInAs", {user: this.props.auth.user.login})}
            </span>
            <ul className="menu-items">
              <RequireAuthority
                  authority="ROLE_ADMIN"
                  item={
                    <li>
                      <Link
                          className="material-icons icon-light icon-32"
                          to="/admin"
                      >
                        {'build'}
                      </Link>
                    </li>
                  }
              />
              <li>
                <Link
                    className="material-icons icon-light icon-32"
                    to="/profile"
                >
                  {'person'}
                </Link>
              </li>
              <li>
                <Link
                    className="material-icons icon-light icon-32"
                    onClick={this.props.logout}
                    to="/"
                >
                  {'exit_to_app'}
                </Link>
              </li>
            </ul>
          </span> :
          <ul className="menu-items">
            <li><Link to={'/authenticate'}>
              {counterpart.translate('general.navigation.authenticate')}
            </Link></li>
          </ul>

        }
      </span>
    );
  }
}

export default connect(
  null,
  {logout}
)(UserMenu);