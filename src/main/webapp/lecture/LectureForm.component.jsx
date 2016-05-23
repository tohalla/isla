import React from 'react';
import counterpart from 'counterpart';
import DatePicker from 'react-datepicker';
import moment from 'moment';

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
    this.onClosesAtChange = this.onClosesAtChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.state = {
      description: '',
      closesAt: moment().add(1, 'days').endOf('day')
    };
  }
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.context.router.push('/authenticate');
    }
  }
  onLectureDescriptionChange(event) {
    this.setState({description: event.target.value});
  }
  onClosesAtChange(date) {
    this.setState({
      closesAt: date ? moment(date).add(1, 'days').endOf('day') : null
    });
  }
  onCancel() {
    this.setState({
      description: '',
      closesAt: moment(moment().add(1, 'days').endOf('day'))
    });
    this.props.onCancel();
  }
  onSubmit(event) {
    event.preventDefault();
    const course = this.props.course.toJS();
    this.props.onSubmit(Object.assign(this.state, {course}));
    this.setState({
      description: '',
      closesAt: moment(moment().add(1, 'days').endOf('day'))
    });
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
              value={this.state.description}
          />
        </WithLabel>
        <WithLabel label={counterpart.translate('lecture.lectureCreation.closesAt')}>
          <DatePicker
              dateFormat="DD.MM.YYYY"
              isClearable
              minDate={moment()}
              onChange={this.onClosesAtChange}
              placeholder={counterpart.translate('lecture.lectureCreation.closesAt')}
              selected={this.state.closesAt}
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
