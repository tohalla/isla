import React from 'react';

export default class Text extends React.Component {
  static propTypes = {
    value: React.PropTypes.string.isRequired
  }
  render() {
    return (
      <span>
        {this.props.value.split('\n').map((line, index) => (
          <div className="row" key={index}>{line || ' '}</div>
        ))}
      </span>
    );
  }
}
