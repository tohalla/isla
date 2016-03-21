import React from 'react';
import {Link} from 'react-router';

export default class Course extends React.Component {
  static propTypes: {
    course: React.propTypes.object.isRequired
  };
  render() {
    const {id, courseName} = this.props.course;
    return (
      <div>
        <Link to={`/courses/${id}`}>{courseName}</Link>
      </div>
    );
  }
}
