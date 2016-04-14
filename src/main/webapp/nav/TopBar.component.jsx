import React from 'react';
import {Link} from 'react-router';
import counterpart from 'counterpart';
import {connect} from 'react-redux';
import {List} from 'immutable';

import UserMenu from './UserMenu.component';
import {fetchViews} from '../view/view';

const mapStateToProps = state => ({
  views: state.getIn(['entities', 'views'])
});

class TopBar extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  static propTypes = {
    auth: React.PropTypes.object.isRequired
  }
  componentWillMount() {
    this.props.fetchViews();
  }
  render() {
    const isActive = this.context.router.isActive;
    const viewItems = [];
    if (this.props.views instanceof List) {
      this.props.views.forEach((view, index) => {
        viewItems.push(
          <li
              className={isActive(`/views/${view.get('id')}`) ? 'active' : ''}
              key={index}
          >
            <Link to={`/views/${view.get('id')}`}>
              {counterpart.translate(`views.${view.get('viewName')}`)}
            </Link>
          </li>
        );
      });
    }
    return (
      <nav className="nav-default">
        <span className="default-menu">
          <Link className="nav-brand" to={'/'}>
            {counterpart.translate("general.navText")}
          </Link>
          <ul className="menu-items">
            {viewItems}
          </ul>
        </span>
        <UserMenu auth={this.props.auth} />
      </nav>
    );
  }
}

export default connect(
  mapStateToProps,
  {fetchViews}
)(TopBar);
