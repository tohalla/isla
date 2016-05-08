import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {List, fromJS} from 'immutable';
import Linkify from 'react-linkify';
import counterpart from 'counterpart';

import QRCode from 'qrcode.react';
import {addComment, updateComment, fetchComments} from '../comment/comment';
import {fetchLectures} from './lecture';
import NewComment from '../comment/NewComment.component';
import Comment from '../comment/Comment.component';
import CommentWithChoices from '../comment/CommentWithChoices.component';

const sort = [
  (a, b) => a.get('read') === b.get('read') ? 0 : a.get('read') || -1,
  (a, b) => a.get('pinned') === b.get('pinned') ? 0 : b.get('pinned') || -1,
  (a, b) =>
    a.get('liked') === b.get('liked') ? 0 : a.get('liked') < b.get('liked') || -1,
  (a, b) =>
    moment(a.get('createdAt')).valueOf() < moment(b.get('createdAt')).valueOf() ? 1 : -1
];

const mapStateToProps = state => ({
  comments: state.getIn(['entities', 'comments']),
  lecture: state.getIn(['entities', 'lectures'])
});
class LectureInstance extends React.Component {
  static contextTypes = {
    socket: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.addComment = this.addComment.bind(this);
    this.onLike = this.onLike.bind(this);
    this.onRead = this.onRead.bind(this);
    this.toggleFreeze = this.toggleFreeze.bind(this);
    this.toggleHideChecked = this.toggleHideChecked.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onVote = this.onVote.bind(this);
    this.toggleQR = this.toggleQR.bind(this);
    this.state = {
      displayQRCode: false,
      likes: new List(),
      freezeView: false,
      hideChecked: false
    };
  }
  componentWillMount() {
    const lecture = this.props.routeParams.id;
    this.props.fetchLectures({lecture});
    this.props.fetchComments(lecture);
    this.context.socket.then(socket => {
      this.setState({
        commentSubscriber:
          socket.subscribe(
            '/topic/room/' + lecture,
            data => {
              this.props.addComment(fromJS(JSON.parse(data.body)));
            }
          ),
        actionSubscriber:
          socket.subscribe(
            `/topic/room/${lecture}/actions`,
            data => {
              this.props.updateComment(fromJS(JSON.parse(data.body)));
            }
          )
      });
    });
  }
  shouldComponentUpdate(newProps, newState, newContext) {
    return !(
      (newState.freezeView && this.state.freezeView) || (
        this.props.comments === newProps.comments &&
        this.props.lecture === newProps.lecture &&
        this.state === newState &&
        JSON.stringify(this.context) === JSON.stringify(newContext)
      )
    );
  }
  componentWillUnmount() {
    if (this.state.commentSubscriber) {
      this.state.commentSubscriber.unsubscribe();
    }
    if (this.state.personalSubscriber) {
      this.state.personalSubscriber.unsubscribe();
    }
    if (this.state.actionSubscriber) {
      this.state.actionSubscriber.unsubscribe();
    }
  }
  toggleQR() {
    this.setState({displayQRCode: !this.state.displayQRCode});
  }
  addComment(comment) {
    this.context.socket.then(socket => {
      socket.send(
        '/topic/comment/' + this.props.lecture.get('id'),
        {},
        JSON.stringify(comment)
      );
    });
  }
  onLike(comment) {
    this.setState({likes: this.state.likes.push(comment)});
    this.context.socket.then(socket => {
      socket.send(
        `/topic/comment/${this.props.lecture.get('id')}/${comment}/like`,
        {}
      );
    });
  }
  onVote(comment, choice) {
    this.setState({likes: this.state.likes.push(comment)});
    this.context.socket.then(socket => {
      socket.send(
        `/topic/comment/${this.props.lecture.get('id')}/${comment}/${choice}/vote`,
        {}
      );
    });
  }
  onRead(comment) {
    this.context.socket.then(socket => {
      socket.send(
        `/topic/comment/${this.props.lecture.get('id')}/${comment}/markasread`,
        {}
      );
    });
  }
  onDelete(comment) {
    this.context.socket.then(socket => {
      socket.send(
        `/topic/comment/${this.props.lecture.get('id')}/${comment}/delete`,
        {}
      );
    });
  }
  toggleFreeze(event) {
    event.preventDefault();
    this.setState({freezeView: !this.state.freezeView});
  }
  toggleHideChecked(event) {
    event.preventDefault();
    this.setState({hideChecked: !this.state.hideChecked});
  }
  render() {
    const comments = [];
    const {freezeView, likes, hideChecked} = this.state;
    if (this.props.comments instanceof List) {
      this.props.comments.sort((a, b) => {
        let order = 0;
        sort.forEach(sortFunction => {
          if (order !== 0) {
            return;
          }
          order = sortFunction(a, b);
        });
        return order;
      }
      )
        .forEach((comment, index) => {
          if (!hideChecked || !comment.get('read')) {
            const mutableComment = comment.toJS();
            mutableComment.content = (
              <Linkify>{mutableComment.content}</Linkify>
            );
            comments.push(comment.get('choices') && comment.get('choices').size ?
              <CommentWithChoices
                  allowModeratorActions={this.props.lecture.getIn(['course', 'hasModeratorRights'])}
                  comment={mutableComment}
                  displayResults={
                    comment.get('read') ||
                    !comment.get('allowLike') ||
                    likes.contains(comment.get('id'))
                  }
                  key={index}
                  onDelete={this.onDelete}
                  onRead={this.onRead}
                  onVote={this.onVote}
              /> :
              <Comment
                  allowLike={
                    (!comment.has('allowLike') || comment.get('allowLike')) &&
                    !likes.contains(comment.get('id'))
                  }
                  allowModeratorActions={this.props.lecture.getIn(['course', 'hasModeratorRights'])}
                  comment={mutableComment}
                  key={index}
                  onDelete={this.onDelete}
                  onLike={this.onLike}
                  onRead={this.onRead}
              />
            );
          }
        }
      );
    }
    return (
      <div>
        {this.state.displayQRCode ?
          <div className="qr-code" onClick={this.toggleQR}>
            <div className="qr-container">
              <QRCode size={window.innerHeight * 0.8} value={document.location.href}/>
            </div>
          </div> : null
        }
        {moment().isBefore(moment(this.props.lecture.get('closesAt'))) ? (
            <div className="comment-form-container">
              <NewComment
                  allowModeratorActions={this.props.lecture.getIn(['course', 'hasModeratorRights'])}
                  onSubmit={this.addComment}
              />
              <ul className="lecture-feed-actions">
                {this.props.lecture.getIn(['course', 'hasModeratorRights']) ?
                <li>
                  <button onClick={this.toggleQR}>
                    {counterpart.translate(`lectureInstance.actions.displayQRCode`)}
                  </button>
                </li> : null
              }
                <li>
                  <button
                      className={freezeView ? 'active' : ''}
                      onClick={this.toggleFreeze}
                  >
                    {counterpart.translate(`lectureInstance.actions.freeze.${
                      freezeView ? 'enabled' : 'disabled'
                    }`)}
                  </button>
                </li>
                <li>
                  <button
                      className={hideChecked ? 'active' : ''}
                      onClick={this.toggleHideChecked}
                  >
                    {counterpart.translate(`lectureInstance.actions.hideChecked.${
                      hideChecked ? 'enabled' : 'disabled'
                    }`)}
                  </button>
                </li>
              </ul>
            </div>
          ) : null
        }
        {comments}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {fetchLectures, addComment, updateComment, fetchComments}
)(LectureInstance);
