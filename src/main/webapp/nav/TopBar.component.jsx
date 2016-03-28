import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import counterpart from 'counterpart';

import {logout} from '../auth/auth';

class TopBar extends React.Component {
  static propTypes = {
    auth: React.PropTypes.object.isRequired
  }
  render() {
    return (
      <nav className="nav-default">
        <span className="default-menu">
          <Link className="nav-brand" to={'/'}>
            {counterpart.translate("general.navText")}
          </Link>
          <ul className="menu-items">
            <li><Link to={'/courses'}>
              {counterpart.translate("navigation.browseCourses")}
            </Link></li>
          </ul>
        </span>
        <span className="user-menu">
          {this.props.auth.isAuthenticated ?
            <span>
              <span>
                {counterpart.translate("general.loggedInAs", {user: this.props.auth.user.login})}
              </span>
              <ul className="menu-items">
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
                {counterpart.translate("navigation.authenticate")}
              </Link></li>
            </ul>

          }
        </span>
      </nav>
    );
  }
}

export default connect(
  null,
  {logout}
)(TopBar);
