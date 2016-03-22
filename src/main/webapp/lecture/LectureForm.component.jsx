import React from 'react';
import counterpart from 'counterpart';

import WithLabel from '../util/WithLabel.component';

export default class LectureForm extends React.Component {
  static propTypes = {
    course: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.handleLectureDescriptionChange = this.handleLectureDescriptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      lecture: {
        description: ''
      }
    };
  }
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.context.router.push('/authenticate');
    }
  }
  handleLectureDescriptionChange(event) {
    const lecture = Object.assign(
      this.state.lecture, {description: event.target.value}
    );
    this.setState({lecture});
  }
  onSubmit() {
    const course = this.props.course;
    console.log(Object.assign(this.state.lecture, {course}));
    this.props.onSubmit(Object.assign(this.state.lecture, {course}));
  }
  render() {
    return (
      <form className="form-vertical-group lecture-form">
        <WithLabel
            item={
              <input
                  onChange={this.handleLectureDescriptionChange}
                  placeholder={counterpart.translate('lecture.lectureCreation.description')}
                  type="text"
                  value={this.state.lecture.description}
              />
            }
            label={counterpart.translate('lecture.lectureCreation.description')}
        />
        <button
            className="right"
            onClick={this.onSubmit}
            type="submit"
        >
          {counterpart.translate('lecture.lectureCreation.create')}
        </button>
      </form>
    );
  }
}
