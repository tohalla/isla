import React from 'react';

import ActiveLectures from '../lecture/ActiveLectures.component';

export default class FrontPage extends React.Component {
  render() {
    return (
      <div className="content">
        <ActiveLectures />
      </div>
    );
  }
}
