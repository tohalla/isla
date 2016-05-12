import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';

import {fetchActiveLectures} from './lecture';
import Lecture from './Lecture.component';

const mapStateToProps = state => (
  {lectures: state.getIn(['entities', 'lectures'])
});

class ActiveLectures extends React.Component {
  componentWillMount() {
    this.props.fetchActiveLectures();
  }
  shouldComponentUpdate(newProps) {
    return !(this.props.lectures === newProps.lectures);
  }
  render() {
    if (this.props.lectures instanceof List) {
      const lectures = [];
      this.props.lectures
      .sort((a, b) => a.get('createdAt') < b.get('createdAt') ? 1 : -1)
      .forEach((lecture, index) => {
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
  {fetchActiveLectures}
)(ActiveLectures);
