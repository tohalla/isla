import React from 'react';
import {connect} from 'react-redux';

import {fetchComments} from '../comment/comment';
const mapStateToProps = state => (
  {comments: state.getIn(['entities', 'comments'])
});

class LectureInstance extends React.Component {
  static propTypes: {
    lecture: React.propTypes.integer
  };
  componentWillMount() {
    this.props.fetchComments(this.props.lecture || this.props.params.id);
  }
  shouldComponentUpdate(newProps) {
    return !(this.props.comments === newProps.comments);
  }
  render() {
    const comments = [];
    this.props.comments.forEach((comment, index) => {
      comments.push(<span comment={comment.toJS()} key={index} />);
    });
    return (
      <div>
        {comments}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {fetchComments}
)(LectureInstance);
