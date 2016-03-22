import React from 'react';

import TopBar from '../nav/TopBar.component';

export default class Default extends React.Component {
  render() {
    return (
      <div className="stretch">
        <div className="wrapper">
          <TopBar />
          <div className="container">
            {this.props.children}
          </div>
          <div className="footer-push"></div>
        </div>
        <div className="footer">
        </div>
      </div>
    );
  }
}
