import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';
import config from '../config';

import DropdownButton from '../util/DropdownButton.component.jsx';

export default class Lecture extends React.Component {
  static propTypes: {
    lecture: React.propTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
  }
  handleMenuItemClick(item) {
    switch (item.toLowerCase()) {
      case 'excel':
        window.location.href = `http://${config.api.host}:${config.api.port}/api/lectures/${this.props.lecture.id}/comments/excel`;
        break;
      default:
        alert('not yet implemented'); // eslint-disable-line
    }
  }
  render() {
    const {id, description, createdAt} = this.props.lecture;
    return (
      <div>
        <Link to={`/instance/${id}`}>
          {moment(createdAt).format('DD.MM.YYYY - HH:mm')}
        </Link>
        <DropdownButton
            clickableItem={
              <button className="material-icons icon-gray icon-24">
                {'file_download'}
              </button>
            }
            handleMenuItemClick={this.handleMenuItemClick}
            menuItems={['Excel', 'PDF']}
        />
        <span className="lecture-description">
          {description}
        </span>
      </div>
    );
  }
}
