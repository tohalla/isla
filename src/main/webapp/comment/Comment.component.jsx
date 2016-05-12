import React from 'react';

export default class Comment extends React.Component {
  static propTypes = {
    allowLike: React.PropTypes.bool.isRequired,
    allowModeratorActions: React.PropTypes.bool,
    comment: React.PropTypes.object.isRequired,
    onDelete: React.PropTypes.func.isRequired,
    onLike: React.PropTypes.func.isRequired,
    onRead: React.PropTypes.func.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.onLike = this.onLike.bind(this);
    this.onRead = this.onRead.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onLike() {
    this.props.onLike(this.props.comment.id);
  }
  onDelete() {
    this.props.onDelete(this.props.comment.id);
  }
  onRead() {
    this.props.onRead(this.props.comment.id);
  }
  render() {
    const {content, read, liked} = this.props.comment;
    return (
      <div className={`comment ${read ? 'checked' : ''}`}>
        <div className="comment-content" >
          {content}
        </div>
        <div className="comment-items" >
          <span className="like-count">{liked}</span>
          {this.props.allowLike && !this.props.comment.read ?
            <button
                className="material-icons icon-darkgray icon-24"
                onClick={this.onLike}
            >
              {'thumb_up'}
            </button> : null
          }
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
      </div>
    );
  }
}
