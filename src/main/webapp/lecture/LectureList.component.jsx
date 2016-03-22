import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import {fetchLectures} from './lecture';
import Lecture from './Lecture.component';

const mapStateToProps = state => (
  {lectures: state.getIn(['entities', 'lectures'])
});

class LectureList extends React.Component {
  static propTypes = {
    course: React.PropTypes.number.isRequired
  }
  componentWillMount() {
    this.props.fetchLectures({course: this.props.course});
  }
  shouldComponentUpdate(newProps) {
    return !(this.props.lectures === newProps.lectures);
  }
  render() {
    if (this.props.lectures instanceof List) {
      const lectures = [];
      this.props.lectures.forEach((lecture, index) => {
        lectures.push(<Lecture key={index} lecture={lecture.toJS()} />);
      });
      return (
        <div className="lecture-list">
          {lectures}
        </div>
      );
    }
    return null;
  }
}

export default connect(
  mapStateToProps,
  {fetchLectures}
)(LectureList);
