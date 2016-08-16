import React from 'react';

export default class WithErrors extends React.Component {
  static propTypes = {
    errors: React.PropTypes.object.isRequired,
    item: React.PropTypes.object.isRequired,
    title: React.PropTypes.string
  };
  render() {
    const errors = [];
    for (let key in this.props.errors) {
      if (Object.hasOwnProperty.call(this.props.errors, key)) {
        if (this.props.errors[key]) {
          errors.push(
            <span className="help-item" key={key}>
              {this.props.errors[key]}
            </span>
          );
        }
      }
    }
    return (
      <div className="block">
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
