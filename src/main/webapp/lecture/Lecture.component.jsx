import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import counterpart from 'counterpart';
import config from '../config';

import DropdownButton from '../util/DropdownButton.component.jsx';

export default class Lecture extends React.Component {
  static propTypes: {
    displayCourseName: React.propTypes.boolean,
    minimal: React.propTypes.boolean,
    hideActions: React.propTypes.boolean,
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
    const {
      id,
      description,
      createdAt,
      closesAt,
      startsAt,
      course
    } = this.props.lecture;
    const isActive =
      moment().isBefore(moment(closesAt)) && (
        !startsAt ||
        moment().isAfter(moment(startsAt))
      );
    return (
      <div className={`lecture-list-item${isActive ? '' : ' inactive'}`}>
        <div className="lecture-title">
          <Link to={`/instance/${id}`}>
            {this.props.displayCourseName ?
              course.courseName : moment(createdAt).format('DD.MM.YYYY - HH:mm')
            }
          </Link>
          {this.props.displayCourseName ?
            <span className="lecture-description">
              {moment(createdAt).format('DD.MM.YYYY - HH:mm')}
            </span> : null
          }
          {this.props.hideActions ? null :
            <DropdownButton
                clickableItem={
                  <button className="material-icons icon-gray icon-24">
                    {'file_download'}
                  </button>
                }
                menuItems={['Excel', 'PDF']}
                onMenuItemClick={this.onMenuItemClick}
            />
          }
        </div>
        {this.props.minimal ? null :
          <div className="lecture-description">
            {description}
            <div className="right">
              {counterpart.translate('lecture.openUntil', {time: moment(closesAt).format('DD.MM.YYYY - HH:mm')})}
            </div>
          </div>
        }
      </div>
    );
  }
}
