import React from 'react';

import TopBarPlain from '../nav/TopBarPlain.component';

export default class Default extends React.Component {
  render() {
    return (
      <div className="stretch">
        <TopBarPlain />
        <div className="plain">
          {this.props.children}
        </div>
      </div>
    );
  }
}
