import React from 'react';
import {connect} from 'react-redux';
import {Map, List} from 'immutable';

import {fetchComments, addComment} from '../comment/comment';
import {fetchLectures} from './lecture';
import CommentForm from '../comment/CommentForm.component';

const mapStateToProps = state => ({
  comments: state.getIn(['entities', 'comments']),
  lecture: state.getIn(['entities', 'lectures'])
});

class LectureInstance extends React.Component {
  static propTypes: {
    lecture: React.propTypes.number.isRequired
  };
  componentWillMount() {
    this.props.fetchLectures({lecture: this.props.routeParams.id});
    this.props.fetchComments(this.props.routeParams.id);
  }
  shouldComponentUpdate(newProps) {
    return !(
      this.props.comments === newProps.comments &&
      this.props.lecture === newProps.lecture
    );
  }
  render() {
    if (
      this.props.lecture instanceof Map &&
      this.props.comments instanceof List
    ) {
      const comments = [];
      this.props.comments.forEach((comment, index) => {
        comments.push(<span comment={comment.toJS()} key={index} />);
      });
      return (

        <div>
          <CommentForm
              lecture={this.props.lecture.toJS()}
              onSubmit={this.props.addComment}
          />
          {comments}
        </div>
      );
    }
    return null;
  }
}

export default connect(
  mapStateToProps,
  {fetchComments, fetchLectures, addComment}
)(LectureInstance);
