import React from 'react';
import counterpart from 'counterpart';

export default class TopBarMain extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    if (window.previousLocation) {
      this.context.router.goBack();
    } else {
      this.context.router.push('/');
    }
  }
  render() {
    return (
      <nav className="nav-plain">
        <ul className="menu-items">
          <li>
            <button onClick={this.goBack}>
              {counterpart.translate("general.navigation.goBack")}
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
