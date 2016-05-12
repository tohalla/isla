import React from 'react';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import {Link} from 'react-router';
import counterpart from 'counterpart';

import {fetchCourses, updateCourse} from './course';
import LectureForm from '../lecture/LectureForm.component';
import {addLecture} from '../lecture/lecture';
import LectureList from '../lecture/LectureList.component';
import RequireAuthority from '../util/RequireAuthority.component';
import CourseForm from './CourseForm.component';

const mapStateToProps = state => (
  {course: state.getIn(['entities', 'courses']),
  auth: state.get('auth')
});

class Course extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      action: ''
    };
    this.setAction = this.setAction.bind(this);
    this.addLecture = this.addLecture.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }
  componentWillMount() {
    this.props.fetchCourses({
      course: this.props.routeParams.id,
      authorized: this.props.auth.getIn(['user', 'authorities']) &&
        this.props.auth.getIn(['user', 'authorities'])
          .contains('ROLE_ADMIN')
    });
  }
  shouldComponentUpdate(newProps, newState) {
    return !(
      this.state.action === newState.action &&
      this.props.course === newProps.course &&
      this.props.auth === newProps.auth
    );
  }
  addLecture(lecture) {
    this.props.addLecture(lecture);
    this.setState({action: ''});
  }
  updateCourse(course) {
    this.props.updateCourse(course);
    this.setState({action: ''});
  }
  setAction(event) {
    this.setState({action: event.target.value});
  }
  onCancel() {
    this.setState({action: ''});
  }
  render() {
    if (
      !this.props.course.get('isFetching') &&
      this.props.course instanceof Map
    ) {
      const course = this.props.course;
      let courseActions;
      if (
        course.get('hasModeratorRights') ||
        (
          this.props.auth.get('user') &&
          this.props.auth.getIn(['user', 'authorities']) &&
          this.props.auth.getIn(['user', 'authorities']).contains('ROLE_ADMIN')
        )
      ) {
        switch (this.state.action) {
          case 'new':
            courseActions = (
              <LectureForm
                  course={course}
                  onCancel={this.onCancel}
                  onSubmit={this.addLecture}
              />
            );
            break;
          case 'edit':
            courseActions = (
              <CourseForm
                  course={course}
                  onCancel={this.onCancel}
                  onSubmit={this.updateCourse}
                  submitText={counterpart.translate('general.submitChanges')}
                  view={course.get('view')}
              />
            );
            break;
          default:
            courseActions = (
              <div className="block">
                <button
                    onClick={this.setAction}
                    type="button"
                    value="new"
                >
                  {counterpart.translate('course.actions.addLecture')}
                </button>
                <RequireAuthority
                    alternativeItem={<span></span>}
                    authority="ROLE_ADMIN"
                    item={
                      <button
                          onClick={this.setAction}
                          type="button"
                          value="edit"
                      >
                        {counterpart.translate('general.edit')}
                      </button>
                    }
                />
              </div>
            );
        }
      }
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
            <div className="course-info">
              <b>{course.get('courseName')}</b>
              <div className="course-description">
                {course.get('courseDescription')}
              </div>
            </div>
            {courseActions}
          </div>
          <LectureList course={course.get('id')} />
        </div>
      );
    }
    return null;
  }
}

export default connect(
  mapStateToProps,
  {addLecture, fetchCourses, updateCourse}
)(Course);
