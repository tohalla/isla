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
  static contextTypes = {
    auth: React.PropTypes.object.isRequired
  }
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
      const authorities = this.context.auth.user ?
        this.context.auth.user.authorities : null;
      return (
        <div className="course-list">
          <RequireAuthoritory
              authorities={authorities}
              authority="ROLE_ADMIN"
              item={<CourseForm onSubmit={this.props.addCourse} />}
          />
          {courses}
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
