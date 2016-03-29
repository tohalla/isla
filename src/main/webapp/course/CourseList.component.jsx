import React from 'react';

import CourseListItem from './CourseListItem.component';

export default class CourseList extends React.Component {
  static propTypes = {
    courses: React.PropTypes.array.isRequired
  }
  shouldComponentUpdate(newProps) {
    return !(this.props.courses === newProps.courses);
  }
  render() {
    const courses = [];
    this.props.courses.forEach((course, index) => {
      courses.push(<CourseListItem course={course} key={index} />);
    });
    return (
      <div>
        <div className="course-list">
          {courses}
        </div>
      </div>
    );
  }
}
