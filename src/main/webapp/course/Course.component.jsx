import React from 'react';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {Link} from 'react-router';
import counterpart from 'counterpart';

import {fetchCourses} from './course';
import LectureForm from '../lecture/LectureForm.component';
import {addLecture} from '../lecture/lecture';
import LectureList from '../lecture/LectureList.component';

const mapStateToProps = state => (
  {course: state.getIn(['entities', 'courses'])
});

class Course extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      action: ''
    };
  }
  componentWillMount() {
    this.props.fetchCourses({course: this.props.routeParams.id});
  }
  shouldComponentUpdate(newProps, newState, newContext) {
    return !(
      this.props.course === newProps.course &&
      JSON.stringify(this.context) === JSON.stringify(newContext)
    );
  }
  render() {
    if (
      !this.props.course.get('isFetching') &&
      this.props.course instanceof Map
    ) {
      const course = this.props.course.toJS();
      return (
        <div className="course">
          <div className="container">
            <div className="block">
              <Link to={`/views/${this.props.course.getIn(['view', 'id'])}`}>
                {counterpart.translate(
                  `views.${this.props.course.getIn(['view', 'viewName'])}`
                )}
              </Link>
            </div>
            {course.hasModeratorRights ?
              <LectureForm
                  course={course}
                  onSubmit={this.props.addLecture}
              /> : null
            }
          </div>
          <LectureList course={course.id} />
        </div>
      );
    }
    return null;
  }
}

export default connect(
  mapStateToProps,
  {addLecture, fetchCourses}
)(Course);
