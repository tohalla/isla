import React from 'react';
import {Link} from 'react-router';
import counterpart from 'counterpart';

export default class TopBar extends React.Component {
  render() {
    return (
      <nav className="nav-default">
        <span className="nav-brand">
          {counterpart.translate("general.navText")}
        </span>
        <Link to={'/authenticate'}>
          {counterpart.translate("navigation.browseLectures")}
        </Link>
        <Link to={'/authenticate'}>
          {counterpart.translate("navigation.authenticate")}
        </Link>
      </nav>
    );
  }
}
