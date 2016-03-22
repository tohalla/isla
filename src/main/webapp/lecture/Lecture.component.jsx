import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

export default class Lecture extends React.Component {
  static propTypes: {
    lecture: React.propTypes.object.isRequired
  };
  render() {
    const {id, description, createdAt} = this.props.lecture;
    return (
      <div>
        <Link to={`/instance/${id}`}>{description}</Link>
        <span className="timestamp">
          {moment(createdAt).format('DD.MM.YYYY - HH:mm')}
        </span>
      </div>
    );
  }
}
