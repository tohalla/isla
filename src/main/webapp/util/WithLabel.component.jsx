import React from 'react';

export default class WithLabel extends React.Component {
  static propTypes = {
    bold: React.PropTypes.bool,
    displayLabelOnMobile: React.PropTypes.bool,
    label: React.PropTypes.string
  };
  render() {
    return (
      <div className="form-group">
        <label className={`form-label${this.props.displayLabelOnMobile ? '' : ' hide-if-mobile'}`}>
          {this.props.bold ? <b>{this.props.label}</b> : this.props.label}
        </label>
        {this.props.children}
      </div>
    );
  }
}
