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
        <Link to={`/instance/${id}`}>
          {moment(createdAt).format('DD.MM.YYYY - HH:mm')}
        </Link>
        <button className="material-icons icon-gray icon-24">
          {'file_download'}
        </button>
        <span className="lecture-description">
          {description}
        </span>
      </div>
    );
  }
}
