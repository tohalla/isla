import React from 'react';
import counterpart from 'counterpart';

import WithLabel from '../util/WithLabel.component';

export default class LectureForm extends React.Component {
  static propTypes = {
    course: React.PropTypes.object.isRequired,
    onCancel: React.PropTypes.func,
    onSubmit: React.PropTypes.func.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.onLectureDescriptionChange = this.onLectureDescriptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
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
  onLectureDescriptionChange(event) {
    const lecture = Object.assign(
      this.state.lecture, {description: event.target.value}
    );
    this.setState({lecture});
  }
  onCancel() {
    this.setState({lecture: {}});
    this.props.onCancel();
  }
  onSubmit(event) {
    event.preventDefault();
    const course = this.props.course;
    this.props.onSubmit(Object.assign(this.state.lecture, {course}));
    this.setState({lecture: {}});
  }
  render() {
    return (
      <form
          className="form-vertical-group lecture-form"
          onSubmit={this.onSubmit}
      >
        <WithLabel label={counterpart.translate('lecture.lectureCreation.description')}>
          <input
              onChange={this.onLectureDescriptionChange}
              placeholder={counterpart.translate('lecture.lectureCreation.description')}
              type="text"
              value={this.state.lecture.description}
          />
        </WithLabel>
        <div className="form-roup">
          <div className="right">
            <button onClick={this.onCancel} type="button">
              {counterpart.translate('general.cancel')}
            </button>
            <button type="submit">
              {counterpart.translate('lecture.lectureCreation.create')}
            </button>
          </div>
        </div>
      </form>
    );
  }
}
