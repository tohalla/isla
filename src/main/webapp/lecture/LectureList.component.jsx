import React from 'react';
import {connect} from 'react-redux';

import {fetchLectures} from './lecture';
import Lecture from './Lecture.component';

const mapStateToProps = state => (
  {lectures: state.getIn(['entities', 'lectures'])
});

class LectureList extends React.Component {
  componentWillMount() {
    this.props.fetchLectures(this.props.routeParams.id);
  }
  shouldComponentUpdate(newProps) {
    return !(this.props.lectures === newProps.lectures);
  }
  render() {
    const lectures = [];
    this.props.lectures.forEach((lecture, index) => {
      lectures.push(<Lecture key={index} lecture={lecture.toJS()} />);
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
