import React from 'react';
import counterpart from 'counterpart';

export default class LectureForm extends React.Component {
  static propTypes = {
    lecture: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.handleContentChange = this.handleContentChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      comment: {
        content: ''
      }
    };
  }
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.context.router.push('/authenticate');
    }
  }
  handleContentChange(event) {
    const comment = Object.assign(
      this.state.comment, {content: event.target.value}
    );
    this.setState({comment});
  }
  onSubmit() {
    const lecture = this.props.lecture;
    this.props.onSubmit(Object.assign(this.state.comment, {lecture}));
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
