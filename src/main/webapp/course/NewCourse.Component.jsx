import React from 'react';
import {connect} from 'react-redux';
import counterpart from 'counterpart';

import {addCourse} from './course';
import WithLabel from '../util/WithLabel.component';
import RequireAuthority from '../util/RequireAuthority.component';

const mapStateToProps = state => (
  {user: state.getIn(['auth', 'user'])
});

class NewCourse extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleCourseNameChange = this.handleCourseNameChange.bind(this);
    this.handleCourseDescriptionChange = this.handleCourseDescriptionChange.bind(this);
    this.addCourse = this.addCourse.bind(this);
    this.state = {
      course: {
        courseName: '',
        courseDescription: '',
        moderators: ''
      }
    };
  }
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.context.router.push('/authenticate');
    }
  }
  shouldComponentUpdate(newProps, newState) {
    return !(this.state === newState && this.props.user === newProps.user);
  }
  handleCourseNameChange(event) {
    const course = Object.assign(
      this.state.course, {courseName: event.target.value}
    );
    this.setState({course});
  }
  handleCourseDescriptionChange(event) {
    const course = Object.assign(
      this.state.course, {courseDescription: event.target.value}
    );
    this.setState({course});
  }
  addCourse() {
    this.props.addCourse(this.state.course);
  }
  render() {
    const authorities = this.props.user ?
      this.props.user.get('authorities').toJS() : null;
    return (
      <RequireAuthority
          authorities={authorities}
          authority="ROLE_ADMIN"
          item={
            <div className="create-course">
              <form className="form-vertical-group">
                <WithLabel
                    item={
                      <input
                          id="login"
                          onChange={this.handleCourseNameChange}
                          placeholder={counterpart.translate('course.courseCreation.name')}
                          type="text"
                          value={this.state.course.courseName}
                      />
                    }
                    label={counterpart.translate('course.courseCreation.name')}
                />
                <WithLabel
                    item={
                      <textarea
                          id="password"
                          onChange={this.handleCourseDescriptionChange}
                          placeholder={counterpart.translate('course.courseCreation.description')}
                          type="password"
                          value={this.state.course.courseDescription}
                      />
                    }
                    label={counterpart.translate('course.courseCreation.description')}
                />
                <button
                    className="right"
                    onClick={this.addCourse}
                    type="submit"
                >
                  {counterpart.translate('course.courseCreation.create')}
                </button>
              </form>
            </div>
          }
      />
    );
  }
}

export default connect(
  mapStateToProps,
  {addCourse}
)(NewCourse);
