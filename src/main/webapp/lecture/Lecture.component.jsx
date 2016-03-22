import React from 'react';
import {Link} from 'react-router';

export default class Lecture extends React.Component {
  static propTypes: {
    lecture: React.propTypes.object.isRequired
  };
  render() {
    const {id, description} = this.props.lecture;
    return (
      <div>
        <Link to={`/instance/${id}`}>{description}</Link>
      </div>
    );
  }
}
