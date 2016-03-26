import React from 'react';
import RequireAuthoritory from '../util/RequireAuthority.component';
import {getPercentage} from '../util/misc';

export default class Comment extends React.Component {
  static contextTypes = {
    auth: React.PropTypes.object.isRequired
  }
  static propTypes = {
    comment: React.PropTypes.object.isRequired,
    displayResults: React.PropTypes.bool.isRequired,
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

    this.props.comment.choices.forEach((choice, index) => {
      choices.push(
        this.props.displayResults ? (
          <div
              className="comment-choice-result"
              id={choice.id}
              key={index}
          >
            <span>
              {`${choice.content} (${getPercentage(choice.score, liked)})`}
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
    const authorities = this.context.auth.user ?
      this.context.auth.user.authorities : null;
    return (
      <div className="comment-container">
        <div className={`comment ${read ? 'checked' : ''}`}>
          <div className="comment-content" >
            {content}
          </div>
          <div className="comment-items" >
            <RequireAuthoritory
                authorities={authorities}
                item={
                  <span className="moderator-actions">
                    {this.props.comment.read ? null :
                        <button
                            className="material-icons icon-gray icon-24"
                            onClick={this.onRead}
                        >
                          {'check'}
                        </button>
                    }
                    <button
                        className="material-icons icon-gray icon-24"
                        onClick={this.onDelete}
                    >
                      {'clear'}
                    </button>
                  </span>
                }
                oneOf={["ROLE_ADMIN", "ROLE_TEACHER"]}
            />
          </div>
        </div>
        {choices}
      </div>
    );
  }
}
