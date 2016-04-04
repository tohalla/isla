import React from 'react';

export default class WithLabel extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired
  };
  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        {this.props.children}
      </div>
    );
  }
}
