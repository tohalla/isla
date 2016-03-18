import React from 'react';

import TopBar from '../nav/TopBar.component';

export default class Default extends React.Component {
  render() {
    return (
      <div>
        <TopBar />
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
}
