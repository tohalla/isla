import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';

import {fetchCourses, addCourse} from './course';
import CourseListItem from './CourseListItem.component';
import CourseForm from './CourseForm.component';
import RequireAuthoritory from '../util/RequireAuthority.component';

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
    if (this.props.courses instanceof List) {
      const courses = [];
      this.props.courses.forEach((course, index) => {
        courses.push(<CourseListItem course={course.toJS()} key={index} />);
      });
      return (
        <div>
          <RequireAuthoritory
              authority="ROLE_ADMIN"
              item={<CourseForm onSubmit={this.props.addCourse} />}
          />
          <div className="course-list">
            {courses}
          </div>
        </div>
      );
    }
    return null;
  }
}

export default connect(
  mapStateToProps,
  {fetchCourses, addCourse}
)(CourseList);
