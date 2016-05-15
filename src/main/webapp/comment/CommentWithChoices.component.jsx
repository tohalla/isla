import React from 'react';
import {getPercentage} from '../util/misc';

export default class CommentWithChoices extends React.Component {
  static propTypes = {
    allowModeratorActions: React.PropTypes.bool,
    comment: React.PropTypes.object.isRequired,
    displayResults: React.PropTypes.bool.isRequired,
    hideActions: React.PropTypes.bool,
    onDelete: React.PropTypes.func.isRequired,
    onRead: React.PropTypes.func.isRequired,
    onVote: React.PropTypes.func.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.onRead = this.onRead.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onVote = this.onVote.bind(this);
  }
  onDelete() {
    this.props.onDelete(this.props.comment.id);
  }
  onRead() {
    this.props.onRead(this.props.comment.id);
  }
  onVote(event) {
    this.props.onVote(this.props.comment.id, event.target.id);
  }
  render() {
    const {content, read, liked} = this.props.comment;
    let choices = [];

    this.props.comment.choices
      .sort((a, b) => a.content < b.content ? -1 : 1)
      .forEach((choice, index) => {
        const percentage = getPercentage(choice.score || 0, liked || 1);
        choices.push(
          this.props.displayResults ? (
            <div
                className="comment-choice-result"
                id={choice.id}
                key={index}
                style={{background: `linear-gradient(90deg, #ecf0f1 ${percentage}%, #fff ${percentage}%)`}}
            >
              <span>
                {`${choice.content} (${percentage}%)`}
              </span>
            </div>
          ) : (
            <div
                className="comment-choice"
                id={choice.id}
                key={index}
                onClick={this.onVote}
            >
              <span>{choice.content}</span>
            </div>
          )
        );
      });
    return (
      <div className="comment-container">
        <div className={`comment ${read ? 'checked' : ''}`}>
          <div className="comment-content" >
            {content}
          </div>
          {this.props.hideActions ? null :
            <div className="comment-items" >
              {this.props.allowModeratorActions ?
                <span className="moderator-actions">
                  {this.props.comment.read ? null :
                      <button
                          className="material-icons icon-darkgray icon-24"
                          onClick={this.onRead}
                      >
                        {'check'}
                      </button>
                  }
                  <button
                      className="material-icons icon-darkgray icon-24"
                      onClick={this.onDelete}
                  >
                    {'clear'}
                  </button>
                </span> : null
              }
            </div>
          }
        </div>
        {choices}
      </div>
    );
  }
}
