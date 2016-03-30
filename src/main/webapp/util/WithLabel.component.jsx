import React from 'react';

export default class WithLabel extends React.Component {
  static propTypes = {
    item: React.PropTypes.object.isRequired,
    label: React.PropTypes.string
  };
  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        {this.props.item}
      </div>
    );
  }
}
