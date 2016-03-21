import React from 'react';

export default class WithErrors extends React.Component {
  static propTypes = {
    errors: React.PropTypes.array.isRequired,
    item: React.PropTypes.object.isRequired,
    title: React.PropTypes.string
  };
  render() {
    const errors = [];
    this.props.errors.forEach((error, index) => {
      errors.push(
        <span className="help-item" key={index}>
          {error}
        </span>
      );
    });
    return (
      <div>
        {this.props.item}
        {errors.length > 0 ?
          <div className="help-block">
            {this.props.title ?
              <span className="help-title">
                {this.props.title}
              </span> : null
            }
            {errors}
          </div> : null
        }
      </div>
    );
  }
}
