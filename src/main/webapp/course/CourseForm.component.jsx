import React from 'react';
import counterpart from 'counterpart';
import {connect} from 'react-redux';
import {List, fromJS} from 'immutable';

import WithLabel from '../util/WithLabel.component';
import EntryInput from 'react-redux-entry-input';
import {fetchUsers} from '../user/user';

const mapStateToProps = state => ({
  users: state.getIn(['entities', 'users'])
});

class CourseForm extends React.Component {
  static contextTypes = {
    auth: React.PropTypes.object.isRequired
  }
  static propTypes = {
    course: React.PropTypes.object,
    onCancel: React.PropTypes.func,
    onSubmit: React.PropTypes.func.isRequired,
    submitText: React.PropTypes.string,
    view: React.PropTypes.object.isRequired
  }
  static defaultProps = {
    submitText: counterpart.translate('course.create')
  }
  constructor(props, context) {
    super(props, context);
    this.onCourseNameChange = this.onCourseNameChange.bind(this);
    this.handleModeratorAddition = this.handleModeratorAddition.bind(this);
    this.handleModeratorDelete = this.handleModeratorDelete.bind(this);
    this.onCourseDescriptionChange = this.onCourseDescriptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    const course = this.props.course;
    this.state = {
      courseName: course ? course.courseName : '',
      courseDescription: course ? course.courseDescription : '',
      moderators: course ? fromJS(course.moderators) : new List()
    };
  }
  componentWillMount() {
    if (this.context.auth.user.authorities.indexOf('ROLE_ADMIN') >= 0) {
      this.props.fetchUsers();
    }
  }
  onCourseNameChange(event) {
    this.setState({courseName: event.target.value});
  }
  onCourseDescriptionChange(event) {
    this.setState({courseDescription: event.target.value});
  }
  handleModeratorDelete(target) {
    this.setState({moderators: this.state.moderators.filter(moderator =>
      moderator !== target)});
  }
  handleModeratorAddition(moderator) {
    this.setState({moderators: this.state.moderators.push(moderator)});
  }
  onCancel() {
    const course = this.props.course;
    this.setState({
      courseName: course ? course.courseName : '',
      courseDescription: course ? course.courseDescription : '',
      moderators: course ? fromJS(course.moderators) : new List()
    });
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.state.courseName.length < 2) {
      return;
    }
    const course = this.props.course;
    this.props.onSubmit({
      id: course ? course.id : null,
      courseName: this.state.courseName,
      courseDescription: this.state.courseDescription,
      moderators: this.state.moderators.toJS(),
      view: this.props.view
    });
    this.setState({
      courseName: course ? course.courseName : '',
      courseDescription: course ? course.courseDescription : '',
      moderators: course ? fromJS(course.moderators) : new List()
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
              value={this.state.courseName}
          />
        </WithLabel>
        <WithLabel label={counterpart.translate('course.description')}>
          <textarea
              onChange={this.onCourseDescriptionChange}
              placeholder={counterpart.translate('course.description')}
              type="text"
              value={this.state.courseDescription}
          />
        </WithLabel>
        <WithLabel label={counterpart.translate('course.moderators')}>
          {this.props.users instanceof List ?
            <EntryInput
                actionAddEntryToState={this.handleModeratorAddition}
                actionRemoveEntryFromState={this.handleModeratorDelete}
                entries={this.state.moderators}
                nameVariable={'login'}
                placeholder={counterpart.translate('course.moderators')}
                suggestions={this.props.users}
            /> : null}
        </WithLabel>
        <div className="form-roup">
          <div className="right">
            {this.props.onCancel ?
              <button onClick={this.onCancel} type="button">
                {counterpart.translate('general.cancel')}
              </button> : null
            }
            <button type="submit">
            {this.props.submitText}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(
  mapStateToProps,
  {fetchUsers}
)(CourseForm);
