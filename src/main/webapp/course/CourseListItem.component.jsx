import React from 'react';
import {Link} from 'react-router';

import Text from '../util/Text.component';

export default class CourseListItem extends React.Component {
  static propTypes: {
    course: React.propTypes.object.isRequired
  };
  render() {
    const {id, courseName, courseDescription} = this.props.course;
    return (
      <div className="course-item">
        <div className="course-title">
          <Link to={`/courses/${id}`}>{courseName}</Link>
        </div>
        <div className="course-content">
          <Text value={courseDescription} />
        </div>
      </div>
    );
  }
}
