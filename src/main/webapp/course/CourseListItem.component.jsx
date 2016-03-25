import React from 'react';
import {Link} from 'react-router';

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
          {courseDescription}
        </div>
      </div>
    );
  }
}
