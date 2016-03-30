import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {Map, List, fromJS} from 'immutable';
import Linkify from 'react-linkify';

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
  static propTypes = {
    lecture: React.PropTypes.object.isRequired
  }
  constructor(props, context) {
    super(props, context);
    this.addComment = this.addComment.bind(this);
    this.onLike = this.onLike.bind(this);
    this.onRead = this.onRead.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onVote = this.onVote.bind(this);
    this.state = {likes: new List()};
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
      this.props.comments === newProps.comments &&
      this.props.lecture === newProps.lecture &&
      JSON.stringify(this.context) === JSON.stringify(newContext)
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
  addComment(comment) {
    this.context.socket.then(socket => {
      console.log(JSON.stringify(comment));
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
  render() {
    const comments = [];
    const likes = this.state.likes;
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
          console.log(comment.get('id') + '  ' + comment.get('allowLike'));
          const mutableComment = comment.toJS();
          mutableComment.content = (
            <Linkify>{mutableComment.content}</Linkify>
          );
          comments.push(comment.get('choices') && comment.get('choices').size ?
            <CommentWithChoices
                comment={mutableComment}
                displayResults={
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
                comment={mutableComment}
                key={index}
                onDelete={this.onDelete}
                onLike={this.onLike}
                onRead={this.onRead}
            />
          );
        }
      );
    }
    return (
      <div>
        <NewComment
            lecture={
              this.props.lecture instanceof Map ?
                this.props.lecture.toJS() : {}
            }
            onSubmit={this.addComment}
        />
        {comments}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {fetchLectures, addComment, updateComment, fetchComments}
)(LectureInstance);
