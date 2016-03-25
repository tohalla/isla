import React from 'react';
import counterpart from 'counterpart';

import WithLabel from '../util/WithLabel.component';

export default class CourseForm extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.handleCourseNameChange = this.handleCourseNameChange.bind(this);
    this.handleCourseDescriptionChange = this.handleCourseDescriptionChange.bind(this);
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
  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.course);
    this.setState({course: {}});
  }
  render() {
    return (
      <form
          className="form-vertical-group course-form"
          onSubmit={this.onSubmit}
      >
        <WithLabel
            item={
              <input
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
                  onChange={this.handleCourseDescriptionChange}
                  placeholder={counterpart.translate('course.courseCreation.description')}
                  type="text"
                  value={this.state.course.courseDescription}
              />
            }
            label={counterpart.translate('course.courseCreation.description')}
        />
        <div className="form-roup">
          <button
              className="right"
              type="submit"
          >
            {counterpart.translate('course.courseCreation.create')}
          </button>
        </div>
      </form>
    );
  }
}
