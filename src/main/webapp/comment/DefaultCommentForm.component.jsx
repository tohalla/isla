import React from 'react';
import counterpart from 'counterpart';

export default class DefaultComment extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    selectCommentType: React.PropTypes.object
  }
  constructor(props, context) {
    super(props, context);
    this.onContentChange = this.onContentChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {comment: {content: ''}};
  }
  onContentChange(event) {
    this.setState(Object.assign(
      this.state.comment, {content: event.target.value}
    ));
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.state.comment.length < 1) {
      return;
    }
    this.props.onSubmit(this.state.comment);
    this.setState({comment: {content: ''}});
  }
  render() {
    return (
      <form
          className="comment-form"
          onSubmit={this.onSubmit}
      >
        {this.props.selectCommentType}
        <input
            className="comment-input"
            maxLenght={512}
            minLength={1}
            onChange={this.onContentChange}
            placeholder={counterpart.translate('lectureInstance.commentCreation.content')}
            required
            type="text"
            value={this.state.comment.content}
        />
        <button
            className="comment-send"
            type="submit"
        >
          {counterpart.translate('lectureInstance.commentCreation.create')}
        </button>
      </form>
    );
  }
}
