import React from 'react';
import onclickoutside from 'react-click-outside';

export default class DropdownButton extends React.Component {
  static propTypes: {
    clickableItem: React.PropTypes.object.isRequired,
    onMenuItemClick: React.PropTypes.func.isRequired,
    menuItems: React.propTypes.array.isRequired // array of strings
  };
  constructor(props, context) {
    super(props, context);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMenuItemClick = this.onMenuItemClick.bind(this);
    this.state = {
      displayDropdown: false
    };
  }
  handleClickOutside() {
    this.setState({displayDropdown: false});
  }
  onMenuItemClick(event) {
    this.props.onMenuItemClick(event.target.id);
  }
  onClick() {
    this.setState({displayDropdown: !this.state.displayDropdown});
  }
  render() {
    const menuItems = [];
    this.props.menuItems.forEach((item, index) => {
      menuItems.push(
        <li
            className="dropdown-item"
            id={typeof item === 'object' ? item.value : item}
            key={index}
            onClick={this.onMenuItemClick}
        >
          {typeof item === 'object' ? item.text : item}
        </li>
      );
    });
    return (
      <span className="dropdown" onClick={this.onClick}>
        <div className="dropdown-clickable-item">
          {this.props.clickableItem}
        </div>
        {
          this.state.displayDropdown ?
            <ul className="dropdown-menu">
              {menuItems}
            </ul> : null
        }
      </span>
    );
  }
}

export default onclickoutside(DropdownButton);
