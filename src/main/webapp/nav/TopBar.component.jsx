import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import counterpart from 'counterpart';

import {logout} from '../auth/auth.service';

const mapStateToProps = state => ({
  auth: state.get('auth')
});

class TopBar extends React.Component {
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
            <li><Link to={'/authenticate'}>
              {counterpart.translate("navigation.authenticate")}
            </Link></li>
          </ul>
        </span>
        {this.props.auth.get('isAuthenticated') ?
          <span className="account-menu">
            <button
                className="material-icons icon-light icon-32"
                onClick={this.props.logout}
            >
              {'exit_to_app'}
            </button>
          </span> : null
        }
      </nav>
    );
  }
}

export default connect(
  mapStateToProps,
  {logout}
)(TopBar);
