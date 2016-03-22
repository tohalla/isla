import React from 'react';

import LectureList from '../lecture/LectureList.component';

export default class Course extends React.Component {
  render() {
    return (
      <div>
        <LectureList course={Number(this.props.routeParams.id)} />
      </div>
    );
  }
}
