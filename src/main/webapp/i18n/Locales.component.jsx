import React from 'react';
import counterpart from 'counterpart';

export default class Locales extends React.Component {
  static propTypes = {
    field: React.PropTypes.object.isRequired
  };
  render() {
    const locales = [];
    const translations = counterpart._registry.translations;
    for (let key in translations) {
      if (Object.hasOwnProperty.call(translations, key)) {
        locales.push(
          <option active={key === this.props.field.value} key={key}>
            {key}
          </option>
        );
      }
    }
    return (
      <select {...this.props.field}>
        {locales}
      </select>
    );
  }
}
