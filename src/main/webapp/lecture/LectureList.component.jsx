import React from 'react';
import {connect} from 'react-redux';

import {fetchLectures} from './lecture';
import Lecture from './Lecture.component';

const mapStateToProps = state => (
  {lectures: state.getIn(['entities', 'lectures'])
});

class LectureList extends React.Component {
  static propTypes: {
    course: React.propTypes.integer
  };
  componentWillMount() {
    this.props.fetchLectures(this.props.course || this.props.params.id);
  }
  shouldComponentUpdate(newProps) {
    return !(this.props.lectures === newProps.lectures);
  }
  render() {
    const lectures = [];
    this.props.lectures.forEach((course, index) => {
      lectures.push(<Lecture key={index} lecture={course.toJS()} />);
    });
    return (
      <div>
        {lectures}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  {fetchLectures}
)(LectureList);
