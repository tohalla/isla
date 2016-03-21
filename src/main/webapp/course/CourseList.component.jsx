import React from 'react';
import {connect} from 'react-redux';
// import {Link} from 'react-router';
// import counterpart from 'counterpart';

import {fetchCourses} from './course';

const mapStateToProps = state => (
  {courses: state.getIn(['entities', 'courses'])
});

class CourseList extends React.Component {
  componentWillMount() {
    this.props.fetchCourses();
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {fetchCourses}
)(CourseList);
