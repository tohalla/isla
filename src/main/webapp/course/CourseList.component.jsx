import React from 'react';
import {connect} from 'react-redux';
// import {Link} from 'react-router';
// import counterpart from 'counterpart';

const mapStateToProps = state => (
  {courses: state.getIn(['entities', 'courses'])
});

class CourseList extends React.Component {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {}
)(CourseList);
