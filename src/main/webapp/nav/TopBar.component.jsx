import React from 'react';
import {Link} from 'react-router';
import counterpart from 'counterpart';
import {connect} from 'react-redux';
import {List} from 'immutable';

import UserMenu from './UserMenu.component';
import {fetchViews} from '../view/view';
import {onMobile} from '../util/misc';

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
  constructor(props, context) {
    super(props, context);
    this.state = {
      expand: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  componentWillMount() {
    this.props.fetchViews();
  }
  toggleMenu() {
    this.setState({expand: !this.state.expand});
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
    if (onMobile() && !this.state.expand) {
      return (
        <nav className="nav-default">
          <span className="mobile-menu">
            <Link className="nav-brand" to={'/'}>
              {counterpart.translate("general.navText")}
            </Link>
            <button
                className="material-icons icon-light icon-32"
                onClick={this.toggleMenu}
                type="button"
            >
              {'menu'}
            </button>
          </span>
        </nav>
      );
    }
    return (
      <nav className="nav-default">
        <span className="default-menu">
          {onMobile() ?
            <span className="mobile-menu">
              <Link className="nav-brand" to={'/'}>
                {counterpart.translate("general.navText")}
              </Link>
              <button
                  className="material-icons icon-light icon-32"
                  onClick={this.toggleMenu}
                  type="button"
              >
                {'menu'}
              </button>
            </span> :
            <Link className="nav-brand" to={'/'}>
              {counterpart.translate("general.navText")}
            </Link>
          }
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
