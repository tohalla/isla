import React from 'react';
import {Link} from 'react-router';
import counterpart from 'counterpart';

import UserMenu from './UserMenu.component';

export default class TopBar extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  static propTypes = {
    auth: React.PropTypes.object.isRequired
  }
  render() {
    const isActive = this.context.router.isActive;
    return (
      <nav className="nav-default">
        <span className="default-menu">
          <Link className="nav-brand" to={'/'}>
            {counterpart.translate("general.navText")}
          </Link>
          <ul className="menu-items">
            <li className={isActive('courses') ? 'active' : ''}>
              <Link to={'/courses'}>
                {counterpart.translate("navigation.browseCourses")}
              </Link>
            </li>
          </ul>
        </span>
        <UserMenu auth={this.props.auth} />
      </nav>
    );
  }
}
