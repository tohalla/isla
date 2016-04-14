import React from 'react';
import {connect} from 'react-redux';
import {List} from 'immutable';

import CourseList from '../course/CourseList.component';
import {fetchCourses, addCourse} from '../course/course';
import CourseForm from '../course/CourseForm.component';
import RequireAuthoritory from '../util/RequireAuthority.component';

const mapStateToProps = state => ({
  courses: state.getIn(['entities', 'courses']),
  views: state.getIn(['entities', 'views'])
});

export default class View extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {activeView: null};
  }
  componentWillMount() {
    this.props.fetchCourses({view: this.props.routeParams.id});
    if (this.props.views instanceof List) {
      this.setState({
        activeView: this.props.views.find(view =>
          view.get('id') === Number(this.props.routeParams.id)
        ).toJS()
      });
    }
  }
  shouldComponentUpdate(newProps, newState) {
    if (
      this.props.views !== newProps.views ||
      this.props.routeParams.id !== newProps.routeParams.id
    ) {
      if (!newProps.courses.get('isFetching')) {
        newProps.fetchCourses({view: newProps.routeParams.id});
      }
      this.setState({
        activeView: newProps.views.find(view =>
          view.get('id') === Number(newProps.routeParams.id)
        ).toJS()
      });
    }
    return !(
      this.props.courses === newProps.courses ||
      this.state !== newState
    );
  }
  render() {
    if (this.props.courses instanceof List && this.state.activeView) {
      return (
        <div>
          <RequireAuthoritory
              authority="ROLE_ADMIN"
              item={
                <div className="container">
                  <CourseForm
                      onSubmit={this.props.addCourse}
                      view={this.state.activeView}
                  />
                </div>
              }
          />
          <CourseList courses={this.props.courses.toJS()} />
        </div>
      );
    }
    return null; // loading indicator..
  }
}

export default connect(
  mapStateToProps,
  {fetchCourses, addCourse}
)(View);
