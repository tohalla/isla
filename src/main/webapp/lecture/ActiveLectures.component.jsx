import React from 'react';
import {List} from 'immutable';
import {connect} from 'react-redux';
import counterpart from 'counterpart';

import {fetchActiveLectures} from './lecture';
import Lecture from './Lecture.component';

const mapStateToProps = state => ({
  auth: state.get('auth'),
  lectures: state.getIn(['entities', 'lectures'])
});

class ActiveLectures extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      query: ''
    };
    this.onQueryChange = this.onQueryChange.bind(this);
  }
  componentWillMount() {
    this.props.fetchActiveLectures();
  }
  shouldComponentUpdate(newProps, newState) {
    return !(
      this.props.lectures === newProps.lectures &&
      this.state.query === newState.query &&
      this.props.auth === newProps.auth
    );
  }
  onQueryChange(event) {
    this.setState({query: event.target.value});
  }
  render() {
    if (this.props.lectures instanceof List) {
      const lectures = [];
      this.props.lectures
      .filter(lecture =>
        !this.state.query ||
        lecture.getIn(['course', 'courseName']).indexOf(this.state.query) !== -1
      )
      .sort((a, b) => a.get('createdAt') < b.get('createdAt') ? 1 : -1)
      .forEach((lecture, index) => {
        lectures.push(
          <Lecture
              displayCourseName
              hideActions
              key={index}
              lecture={lecture.toJS()}
              minimal
          />
        );
      });
      return (
        <div className="lecture-list">
          {this.props.lectures.count() > 0 ? (
            <div>
              <input
                  className="lecture-list-search"
                  onChange={this.onQueryChange}
                  placeholder={counterpart.translate('lecture.searchPlaceholder')}
                  type="text"
                  value={this.state.query}
              />
              {lectures}
            </div>
          ) : (
            <div className="container">
              {counterpart.translate('lecture.noActive')}
            </div>
          )}
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
