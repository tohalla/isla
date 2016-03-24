import React from 'react';
import counterpart from 'counterpart';

export default class CommentForm extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = Object.assign({}, {comment: {}});
  }
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.context.router.push('/authenticate');
    }
  }
  handleContentChange(event) {
    this.setState(Object.assign(
      this.state.comment, {content: event.target.value}
    ));
  }
  onSubmit() {
    this.props.onSubmit(this.state.comment);
    this.setState({comment: {}});
  }
  render() {
    return (
      <form className="comment-form">
        <input
            className="comment-input"
            onChange={this.handleContentChange}
            placeholder={counterpart.translate('comment.commentCreation.content')}
            type="text"
            value={this.state.comment.content}
        />
        <button
            className="comment-send"
            onClick={this.onSubmit}
            type="submit"
        >
          {counterpart.translate('comment.commentCreation.create')}
        </button>
      </form>
    );
  }
}
