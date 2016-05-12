import React from 'react';

import ActiveLectures from '../lecture/ActiveLectures.component';

export default class Frontpage extends React.Component {
  render() {
    return (
      <div>
        <ActiveLectures />
      </div>
    );
  }
}
