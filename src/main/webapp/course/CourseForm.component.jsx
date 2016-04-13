import React from 'react';
import counterpart from 'counterpart';

import WithLabel from '../util/WithLabel.component';

export default class CourseForm extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    view: React.PropTypes.object.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.onCourseNameChange = this.onCourseNameChange.bind(this);
    this.onCourseDescriptionChange = this.onCourseDescriptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
  onCourseNameChange(event) {
    const course = Object.assign(
      this.state.course, {courseName: event.target.value}
    );
    this.setState({course});
  }
  onCourseDescriptionChange(event) {
    const course = Object.assign(
      this.state.course, {courseDescription: event.target.value}
    );
    this.setState({course});
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.state.course.courseName.length < 2) {
      return;
    }
    this.props.onSubmit(Object.assign(
      this.state.course,
      {view: this.props.view}
    ));
    this.setState({
      course: {
        courseName: '',
        courseDescription: '',
        moderators: ''
      }
    });
  }
  render() {
    return (
      <form
          className="form-vertical-group course-form"
          onSubmit={this.onSubmit}
      >
        <WithLabel label={counterpart.translate('course.name')}>
          <input
              maxLenght={512}
              minLength={2}
              onChange={this.onCourseNameChange}
              placeholder={counterpart.translate('course.name')}
              required
              type="text"
              value={this.state.course.courseName}
          />
        </WithLabel>
        <WithLabel label={counterpart.translate('course.description')}>
          <textarea
              onChange={this.onCourseDescriptionChange}
              placeholder={counterpart.translate('course.description')}
              type="text"
              value={this.state.course.courseDescription}
          />
        </WithLabel>
        <div className="form-roup">
          <button
              className="right"
              type="submit"
          >
            {counterpart.translate('course.create')}
          </button>
        </div>
      </form>
    );
  }
}
