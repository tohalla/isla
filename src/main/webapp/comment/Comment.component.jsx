import React from 'react';
import RequireAuthoritory from '../util/RequireAuthority.component';

export default class Comment extends React.Component {
  static contextTypes = {
    auth: React.PropTypes.object.isRequired
  }
  static propTypes = {
    comment: React.PropTypes.object.isRequired,
    onLike: React.PropTypes.func.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.onLike = this.onLike.bind(this);
  }
  onLike() {
    this.props.onLike(this.props.comment.id);
  }
  render() {
    const {content, read, allowLike, liked} = this.props.comment;
    const authorities = this.context.auth.user ?
      this.context.auth.user.authorities : null;
    return (
      <div className={`comment ${read ? 'checked' : null}`}>
        <div className="comment-content" >
          {content}
        </div>
        <div className="comment-items" >
          {liked}
          {allowLike ?
            <button
                className="material-icons icon-gray icon-24"
                onClick={this.onLike}
            >
              {'thumb_up'}
            </button> : null
          }
          <RequireAuthoritory
              authorities={authorities}
              item={
                <span className="moderator-actions">
                  <button
                      className="material-icons icon-gray icon-24"
                      onClick={this.props.logout}
                  >
                    {'check'}
                  </button>
                  <button
                      className="material-icons icon-gray icon-24"
                      onClick={this.props.logout}
                  >
                    {'clear'}
                  </button>
                </span>
              }
              oneOf={["ROLE_ADMIN", "ROLE_TEACHER"]}
          />
        </div>
      </div>
    );
  }
}
