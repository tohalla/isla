import React from 'react';
import counterpart from 'counterpart';

export default class MultipleChoiceComment extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    selectCommentType: React.PropTypes.object
  }
  constructor(props, context) {
    super(props, context);
    this.onContentChange = this.onContentChange.bind(this);
    this.onNewChoiceContentChange = this.onNewChoiceContentChange.bind(this);
    this.onAddChoice = this.onAddChoice.bind(this);
    this.onRemoveChoice = this.onRemoveChoice.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCommentKeyPress = this.onCommentKeyPress.bind(this);
    this.state = {comment: {choices: [], content: ''}, newChoice: ''};
  }
  onContentChange(event) {
    this.setState({
      comment: Object.assign(this.state.comment, {content: event.target.value})
    });
  }
  onNewChoiceContentChange(event) {
    this.setState({newChoice: event.target.value});
  }
  onSubmit(event) {
    event.preventDefault();
    if (this.state.comment.choices.length < 1) {
      return;
    }
    this.props.onSubmit(this.state.comment);
    this.setState({comment: {choices: [], content: ''}, newChoice: ''});
  }
  onAddChoice(event) {
    event.preventDefault();
    if (this.state.newChoice.length < 1) {
      return;
    }
    const {newChoice, comment} = this.state;
    this.setState({
      newChoice: '',
      comment: Object.assign(comment, {
        choices: comment.choices.indexOf(newChoice) === -1 ?
          comment.choices.concat(newChoice) : comment.choices
      })
    });
  }
  onRemoveChoice(event) {
    event.preventDefault();
    const comment = Object.assign({}, this.state.comment);
    let choices = comment.choices.slice();
    choices.splice(event.target.id, 1);
    this.setState({
      newChoice: '',
      comment: Object.assign(comment, {choices})
    });
  }
  onCommentKeyPress(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById('newChoice').focus();
    }
  }
  render() {
    let choices = [];
    this.state.comment.choices.forEach((choice, index) => {
      choices.push(
        <div className="comment-choice" key={index}>
          <button
              className="choice-button material-icons"
              id={index}
              onClick={this.onRemoveChoice}
          >
            {'remove'}
          </button>
          <span className="comment-choice-content">{choice}</span>
        </div>
      );
    });
    return (
      <form
          className="comment-form"
          onSubmit={this.onSubmit}
      >
        {this.props.selectCommentType}
        <span className="comment-input multiple-choice-comment">
          <input
              className=""
              onChange={this.onContentChange}
              onKeyPress={this.onCommentKeyPress}
              placeholder={counterpart.translate('lectureInstance.commentCreation.content')}
              type="text"
              value={this.state.comment.content}
          />
          <div className="comment-choices">
            <div className="comment-choice">
              <input
                  className="comment-choice-content"
                  id="newChoice"
                  onChange={this.onNewChoiceContentChange}
                  placeholder={counterpart.translate('lectureInstance.commentCreation.choiceContent')}
                  value={this.state.newChoice}
              />
              <button
                  className="choice-button material-icons"
                  onClick={this.onAddChoice}
              >{'add'}</button>
            </div>
            {choices}
          </div>
        </span>
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
