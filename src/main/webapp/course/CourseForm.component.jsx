import React from 'react';
import counterpart from 'counterpart';
import {connect} from 'react-redux';
import {List} from 'immutable';

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
    onSubmit: React.PropTypes.func.isRequired,
    view: React.PropTypes.object.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.onCourseNameChange = this.onCourseNameChange.bind(this);
    this.handleModeratorAddition = this.handleModeratorAddition.bind(this);
    this.handleModeratorDelete = this.handleModeratorDelete.bind(this);
    this.onCourseDescriptionChange = this.onCourseDescriptionChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      courseName: '',
      courseDescription: '',
      moderators: new List()
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
  onSubmit(event) {
    event.preventDefault();
    if (this.state.courseName.length < 2) {
      return;
    }
    this.props.onSubmit({
      courseName: this.state.courseName,
      courseDescription: this.state.courseDescription,
      moderators: this.state.moderators.toJS(),
      view: this.props.view
    });
    this.setState({
      courseName: '',
      courseDescription: '',
      moderators: new List()
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
          <EntryInput
              actionAddEntryToState={this.handleModeratorAddition}
              actionRemoveEntryFromState={this.handleModeratorDelete}
              entries={this.state.moderators}
              nameVariable={'login'}
              placeholder={counterpart.translate('course.moderators')}
              suggestions={this.props.users}
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

export default connect(
  mapStateToProps,
  {fetchUsers}
)(CourseForm);
