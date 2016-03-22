import React from 'react';
import counterpart from 'counterpart';

export default class TopBarMain extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  render() {
    return (
      <nav className="nav-plain">
        <ul className="menu-items">
          <li>
            <button onClick={this.context.router.goBack}>
              {counterpart.translate("navigation.goBack")}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
