import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import counterpart from 'counterpart';
import config from '../config';

import DropdownButton from '../util/DropdownButton.component.jsx';

export default class Lecture extends React.Component {
  static propTypes: {
    lecture: React.propTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
  }
  onMenuItemClick(item) {
    const link = document.createElement('a');
    link.download = `lecture-${this.props.lecture.id}`;
    link.target = '_new';
    link.rel = 'noopener noreferrer';
    switch (item.toLowerCase()) {
      case 'excel':
        link.href = `http://${config.api.host}:${config.api.port}/api/lectures/${this.props.lecture.id}/comments/excel`;
        link.click();
        break;
      case 'pdf':
        link.href = `http://${config.api.host}:${config.api.port}/api/lectures/${this.props.lecture.id}/comments/pdf`;
        link.click();
        break;
      default:
        alert('not yet implemented'); // eslint-disable-line
    }
  }
  render() {
    const {id, description, createdAt, closesAt} = this.props.lecture;
    return (
      <div className="lecture-list-item">
        <div className="lecture-title">
          <Link to={`/instance/${id}`}>
            {moment(createdAt).format('DD.MM.YYYY - HH:mm')}
          </Link>
          <DropdownButton
              clickableItem={
                <button className="material-icons icon-gray icon-24">
                  {'file_download'}
                </button>
              }
              menuItems={['Excel', 'PDF']}
              onMenuItemClick={this.onMenuItemClick}
          />
        </div>
        <div className="lecture-description">
          {description}
          <div className="right">
            {counterpart.translate('lecture.openUntil', {time: moment(closesAt).format('DD.MM.YYYY - HH:mm')})}
          </div>
        </div>
      </div>
    );
  }
}
