import React from 'react';

import TopBar from '../nav/TopBar.component';
import Footer from './Footer.component';

export default class Default extends React.Component {
  render() {
    return (
      <div className="stretch">
        <div className="wrapper">
          <TopBar />
          <div className="content">
            {this.props.children}
          </div>
          <div className="footer-push"></div>
        </div>
        <Footer />
      </div>
    );
  }
}
