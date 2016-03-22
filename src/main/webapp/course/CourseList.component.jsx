import React from 'react';
import {connect} from 'react-redux';

import {fetchCourses} from './course';
import Course from './Course.component';
import NewCourse from './NewCourse.component';

const mapStateToProps = state => (
  {courses: state.getIn(['entities', 'courses'])
});

class CourseList extends React.Component {
  componentWillMount() {
    this.props.fetchCourses();
  }
  shouldComponentUpdate(newProps) {
    return !(this.props.courses === newProps.courses);
  }
  render() {
    const courses = [];
    this.props.courses.forEach((course, index) => {
      courses.push(<Course course={course.toJS()} key={index} />);
    });
    return (
      <div>
        <NewCourse />
        {courses}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {fetchCourses}
)(CourseList);
