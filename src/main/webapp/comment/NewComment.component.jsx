import React from 'react';
import counterpart from 'counterpart';

import DefaultCommentForm from './DefaultCommentForm.component';
import MultipleChoiceCommentForm from './MultipleChoiceCommentForm.component';
import RequireAuthoritory from '../util/RequireAuthority.component';

export default class NewComment extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.onCommentTypeChange = this.onCommentTypeChange.bind(this);
    this.state = {commentType: 'default'};
  }
  onCommentTypeChange(event) {
    this.setState({commentType: event.target.value});
  }
  render() {
    const selectCommentType = (
      <RequireAuthoritory
          alternativeItem={<span className="select-comment-type" />}
          authority="ROLE_ADMIN"
          item={
            <select
                className="select-comment-type"
                onChange={this.onCommentTypeChange}
                value={this.state.commentType}
            >
              <option value="default">{counterpart.translate('lectureInstance.commentTypes.normal')}</option>
              <option value="multipleChoice">{counterpart.translate('lectureInstance.commentTypes.multipleChoice')}</option>
            </select>
          }
      />
    );
    const commentForm = () => {
      switch (this.state.commentType) {
        case 'multipleChoice':
          return (
            <MultipleChoiceCommentForm
                onSubmit={this.props.onSubmit}
                selectCommentType={selectCommentType}
            />
          );
        default:
          return (
            <DefaultCommentForm
                onSubmit={this.props.onSubmit}
                selectCommentType={selectCommentType}
            />
          );
      }
    };

    return commentForm();
  }
}
