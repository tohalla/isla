import React from 'react';
import {Link} from 'react-router';

export default class TopBar extends React.Component {
  render() {
    return (
      <nav className="nav-default">
        <Link to={'/authenticate'}>{"Authenticate"}</Link>
      </nav>
    );
  }
}
