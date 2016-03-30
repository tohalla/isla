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
        <WithLabel
            item={
              <input
                  maxLenght={512}
                  minLength={2}
                  onChange={this.handleCourseNameChange}
                  placeholder={counterpart.translate('course.courseCreation.name')}
                  required
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
